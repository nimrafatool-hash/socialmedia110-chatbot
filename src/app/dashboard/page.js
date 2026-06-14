import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, knowledge: 0, chats: 0 });
  const [loading, setLoading] = useState(true);
  const [hasBot, setHasBot] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const userId = session.user.id;

    // First check if user has any bots
    const { data: bots } = await supabase.from('bots').select('id').eq('user_id', userId);
    
    if (!bots || bots.length === 0) {
      setHasBot(false);
      setLoading(false);
      return; // Leave stats at 0
    }

    setHasBot(true);
    const botIds = bots.map(b => b.id);

    // Fetch stats ONLY for their bots
    const [leadsRes, kbRes, chatsRes] = await Promise.all([
      supabase.from('leads').select('id', { count: 'exact' }).in('bot_id', botIds),
      supabase.from('knowledge_base').select('id', { count: 'exact' }).in('bot_id', botIds),
      supabase.from('chat_sessions').select('id', { count: 'exact' }).in('bot_id', botIds)
    ]);

    setStats({
      leads: leadsRes.count || 0,
      knowledge: kbRes.count || 0,
      chats: chatsRes.count || 0
    });
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome back, Admin 👋</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px' }}>Here is what is happening with your AI Chatbots today.</p>

      {!hasBot && !loading && (
        <div style={{ backgroundColor: '#EEF2FF', padding: '24px', borderRadius: '16px', marginBottom: '32px', border: '1px solid #C7D2FE' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4F46E5', marginBottom: '8px' }}>🚀 Welcome to your new SaaS!</h2>
          <p style={{ color: '#4338CA', marginBottom: '16px' }}>You don't have any chatbots yet. Create your first chatbot to start capturing leads.</p>
          <Link href="/dashboard/chatbots" style={{ backgroundColor: '#4F46E5', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>
            Create Chatbot
          </Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Total Leads Captured</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginTop: '8px' }}>{loading ? '...' : stats.leads}</div>
          <div style={{ fontSize: '14px', color: '#10B981', marginTop: '8px', fontWeight: '500' }}>Active in CRM</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>AI Knowledge Items</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginTop: '8px' }}>{loading ? '...' : stats.knowledge}</div>
          <div style={{ fontSize: '14px', color: '#4F46E5', marginTop: '8px', fontWeight: '500' }}>Training your bot</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Total Chat Sessions</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginTop: '8px' }}>{loading ? '...' : stats.chats}</div>
          <div style={{ fontSize: '14px', color: '#F59E0B', marginTop: '8px', fontWeight: '500' }}>Conversations started</div>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>Recent CRM Leads</h2>
          <button style={{ backgroundColor: '#F3F4F6', color: '#374151', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>View All</button>
        </div>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '14px' }}>
              <th style={{ padding: '16px 0', fontWeight: '600' }}>Name</th>
              <th style={{ fontWeight: '600' }}>Email / Contact</th>
              <th style={{ fontWeight: '600' }}>Chatbot Source</th>
              <th style={{ fontWeight: '600' }}>Status</th>
              <th style={{ fontWeight: '600' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F3F4F6', fontSize: '15px' }}>
              <td style={{ padding: '16px 0', fontWeight: '600', color: '#111827' }}>Ali Khan</td>
              <td style={{ color: '#4F46E5', fontWeight: '500' }}>ali.khan@example.com</td>
              <td><span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>SocialMedia110</span></td>
              <td><span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>New Lead</span></td>
              <td style={{ color: '#6B7280' }}>Just now</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F3F4F6', fontSize: '15px' }}>
              <td style={{ padding: '16px 0', fontWeight: '600', color: '#111827' }}>Sara Ahmed</td>
              <td style={{ color: '#4F46E5', fontWeight: '500' }}>sara123@gmail.com</td>
              <td><span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>TechStore Bot</span></td>
              <td><span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>Contacted</span></td>
              <td style={{ color: '#6B7280' }}>2 hrs ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
