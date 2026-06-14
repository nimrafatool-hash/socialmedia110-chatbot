'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Note: This fetches from users_subscription assuming RLS is disabled or allows reading.
    const { data, error } = await supabase
      .from('users_subscription')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    
    // Optimistic UI update
    setUsers(users.map(u => u.user_id === userId ? { ...u, status: newStatus } : u));

    await supabase
      .from('users_subscription')
      .update({ status: newStatus })
      .eq('user_id', userId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>Registered Users</h1>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Manage client subscriptions and billing access.</p>
        </div>
        <button onClick={fetchUsers} style={{ padding: '10px 16px', backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          🔄 Refresh
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            <tr>
              <th style={{ padding: '16px 24px', color: '#4B5563', fontWeight: '600', fontSize: '14px' }}>User / Email</th>
              <th style={{ padding: '16px 24px', color: '#4B5563', fontWeight: '600', fontSize: '14px' }}>Joined At</th>
              <th style={{ padding: '16px 24px', color: '#4B5563', fontWeight: '600', fontSize: '14px' }}>Status</th>
              <th style={{ padding: '16px 24px', color: '#4B5563', fontWeight: '600', fontSize: '14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>No users found. Make sure the 'email' column exists in your table.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.user_id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{user.email || 'Email not captured yet'}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', fontFamily: 'monospace' }}>{user.user_id}</div>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#4B5563', fontSize: '14px' }}>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '50px', 
                      fontSize: '12px', 
                      fontWeight: '700',
                      backgroundColor: user.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                      color: user.status === 'Active' ? '#065F46' : '#991B1B'
                    }}>
                      {user.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => toggleStatus(user.user_id, user.status)}
                      style={{ 
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        border: 'none', 
                        fontWeight: '600', 
                        cursor: 'pointer',
                        backgroundColor: user.status === 'Active' ? '#FEE2E2' : '#10B981',
                        color: user.status === 'Active' ? '#991B1B' : 'white',
                        transition: 'all 0.2s'
                      }}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate User'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
