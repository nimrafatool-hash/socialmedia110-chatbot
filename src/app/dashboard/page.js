export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome back, Admin 👋</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px' }}>Here is what is happening with your chatbots today.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {/* Metric Cards */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Total Conversations</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px', color: '#111827' }}>142</p>
          <p style={{ fontSize: '12px', color: '#10B981', marginTop: '8px', fontWeight: '600' }}>↑ 12% from last week</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Leads Captured</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px', color: '#111827' }}>28</p>
          <p style={{ fontSize: '12px', color: '#10B981', marginTop: '8px', fontWeight: '600' }}>↑ 4 new today</p>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Active Chatbots</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px', color: '#111827' }}>3</p>
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>Running flawlessly</p>
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
