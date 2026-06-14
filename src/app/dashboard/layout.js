'use client';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Dashboard...</div>;
  }

  return (
    <div className={inter.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#111827' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#4F46E5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S</div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: 0 }}>SaaS Admin</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          <Link href="/dashboard" style={{ fontWeight: '600', color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '12px' }}>📊 Overview</Link>
          <Link href="/dashboard/chatbots" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>🤖 My Chatbots</Link>
          <Link href="/dashboard/leads" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>🎯 Leads CRM</Link>
          <Link href="/dashboard/livechat" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>💬 Live Chat</Link>
          <Link href="/dashboard/knowledge" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>📚 AI Knowledge</Link>
          <Link href="/dashboard/analytics" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>📈 Analytics</Link>
          <Link href="/dashboard/settings" style={{ fontWeight: '600', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '12px' }}>⚙️ Settings/Billing</Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
          <button 
            onClick={handleSignOut}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontWeight: '600', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px 0' }}>
            🚪 Sign Out
          </button>
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>Admin User</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Connected to Supabase ✅</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px' }}>
        {children}
      </main>
    </div>
  );
}
