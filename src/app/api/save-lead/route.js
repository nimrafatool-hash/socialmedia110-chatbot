import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { name, email, chatbot_source } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from('leads')
      .insert({ name, email, chatbot_source: chatbot_source || 'SocialMedia110' });

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Lead Save Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
