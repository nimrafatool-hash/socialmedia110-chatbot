'use client';
import { useState } from 'react';

export default function KnowledgeBase() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/upload-knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, bot_id: '00000000-0000-0000-0000-000000000000' }) // Default UUID for testing
      });
      const data = await res.json();
      if (res.ok) setMessage('✅ Knowledge successfully added to AI Brain!');
      else setMessage('❌ Error: ' + data.error);
    } catch (e) {
      setMessage('❌ Error connecting to server.');
    }
    setLoading(false);
    setText('');
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>📚 AI Knowledge Base (RAG)</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px' }}>Train your chatbot by pasting business documents, FAQs, or rules here.</p>

      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Add New Knowledge</h2>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your business info here... (e.g., 'We offer video editing for $500/month. Our support email is help@socialmedia110.com')"
          style={{ width: '100%', height: '200px', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', marginBottom: '16px', resize: 'vertical', fontFamily: 'inherit', fontSize: '14px' }}
        />
        <button 
          onClick={handleUpload}
          disabled={loading}
          style={{ backgroundColor: '#4F46E5', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Training AI...' : 'Train Chatbot 🧠'}
        </button>
        {message && <p style={{ marginTop: '16px', fontWeight: '500', color: message.includes('Error') ? '#EF4444' : '#10B981' }}>{message}</p>}
      </div>
    </div>
  );
}
