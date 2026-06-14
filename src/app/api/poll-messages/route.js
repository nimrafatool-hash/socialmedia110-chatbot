import { supabase } from '@/lib/supabaseClient';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get('session_id');

    if (!session_id) return Response.json({ error: 'session_id required' }, { status: 400 });

    // Get session status
    const { data: session } = await supabase
      .from('chat_sessions')
      .select('is_human_takeover')
      .eq('id', session_id)
      .single();

    // Get admin messages only
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', session_id)
      .eq('role', 'admin')
      .order('created_at', { ascending: true });

    return Response.json({
      new_messages: messages || [],
      is_human_takeover: session?.is_human_takeover || false
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
