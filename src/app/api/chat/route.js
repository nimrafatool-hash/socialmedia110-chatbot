import { supabase } from '@/lib/supabaseClient';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getRelevantKnowledge(userQuery) {
  try {
    const { data } = await supabase
      .from('knowledge_base')
      .select('content')
      .textSearch('content', userQuery.split(' ').slice(0, 5).join(' | '), {
        type: 'websearch',
        config: 'english'
      })
      .limit(3);

    if (!data || data.length === 0) {
      const { data: fallback } = await supabase
        .from('knowledge_base')
        .select('content')
        .order('created_at', { ascending: false })
        .limit(3);
      return fallback ? fallback.map(d => d.content).join('\n---\n') : '';
    }
    return data.map(d => d.content).join('\n---\n');
  } catch (e) {
    return '';
  }
}

export async function POST(req) {
  try {
    const { messages, session_id } = await req.json();

    // Check if human has taken over
    if (session_id) {
      const { data: session } = await supabase
        .from('chat_sessions')
        .select('is_human_takeover')
        .eq('id', session_id)
        .single();

      if (session?.is_human_takeover) {
        // Save user message but don't generate AI reply
        const lastMsg = messages[messages.length - 1];
        await supabase.from('chat_messages').insert({
          session_id,
          role: 'user',
          content: lastMsg?.parts?.[0]?.text || ''
        });
        return Response.json({ reply: null, human_takeover: true });
      }
    }

    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const userQuery = lastUserMessage?.parts?.[0]?.text || '';
    const knowledge = await getRelevantKnowledge(userQuery);

    const knowledgeSection = knowledge
      ? `\n\nRELEVANT BUSINESS KNOWLEDGE:\n${knowledge}`
      : '';

    const systemInstruction = `You are a helpful, professional AI Sales Assistant for SocialMedia110, a social media marketing agency.
Help visitors understand services, answer questions, and qualify leads.
Services: Short Form Content Editing, Long Form Content Editing, Graphic Design & Thumbnails, Social Media Management, Content Strategy & Audit.
Niches: SaaS, Tech & Apps, Personal Brands, E-commerce, Gaming, Real Estate, Finance & Crypto, Education.
Key selling points: 24/7 Support, Daily Updates, 1-on-1 Consultation, Advanced Storytelling.
Keep responses concise and friendly. Do not invent pricing.${knowledgeSection}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messages,
      config: { systemInstruction, temperature: 0.7 }
    });

    const replyText = response.text;

    // Save messages to DB for live chat visibility
    if (session_id) {
      await supabase.from('chat_messages').insert([
        { session_id, role: 'user', content: userQuery },
        { session_id, role: 'model', content: replyText }
      ]);
    }

    return Response.json({ reply: replyText });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
