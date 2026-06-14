import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { content, bot_id } = await req.json();

    if (!content) {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    // Store text directly in Supabase (no embeddings needed)
    const { error } = await supabase
      .from('knowledge_base')
      .insert({
        bot_id: bot_id || '00000000-0000-0000-0000-000000000000',
        content: content,
      });

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Knowledge Upload Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
