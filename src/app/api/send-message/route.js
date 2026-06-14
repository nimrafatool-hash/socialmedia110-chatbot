import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { session_id, role, content } = await req.json();
    const { error } = await supabase
      .from('chat_messages')
      .insert({ session_id, role, content });
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
