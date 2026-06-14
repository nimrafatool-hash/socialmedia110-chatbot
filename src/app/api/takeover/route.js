import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { session_id, takeover } = await req.json();
    const { error } = await supabase
      .from('chat_sessions')
      .update({ is_human_takeover: takeover })
      .eq('id', session_id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
