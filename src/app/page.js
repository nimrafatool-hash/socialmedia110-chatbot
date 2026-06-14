'use client';
import Link from 'next/link';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <header style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '28px' }}>🚀</div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>BotSaaS</h1>
        </div>
        <nav style={{ display: 'flex', gap: '32px', fontWeight: '600', color: '#4B5563' }}>
          <span style={{ cursor: 'pointer' }}>Features</span>
          <span style={{ cursor: 'pointer' }}>Pricing</span>
          <span style={{ cursor: 'pointer' }}>How it Works</span>
        </nav>
        <Link href="/login" style={{ backgroundColor: '#111827', color: 'white', padding: '10px 24px', borderRadius: '50px', fontWeight: '600', textDecoration: 'none' }}>
          Dashboard / Login
        </Link>
      </header>

      {/* Hero Section */}
      <main style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '6px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '24px' }}>
          ✨ The Future of Customer Support
        </div>
        
        <h2 style={{ fontSize: '64px', fontWeight: '900', color: '#111827', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-2px' }}>
          Grow Your Business with <br />
          <span style={{ color: '#4F46E5' }}>AI-Powered Chatbots</span>
        </h2>
        
        <p style={{ fontSize: '20px', color: '#6B7280', maxWidth: '600px', margin: '0 auto', marginBottom: '40px', lineHeight: '1.6' }}>
          Turn your website visitors into paying customers. Train an AI on your website in 2 minutes, embed it anywhere, and watch your sales grow 24/7.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/login" style={{ backgroundColor: '#4F46E5', color: 'white', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: '700', textDecoration: 'none', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)' }}>
            Start Building for Free
          </Link>
          <Link href="#demo" style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: '700', textDecoration: 'none', border: '1px solid #E5E7EB' }}>
            Book a Demo
          </Link>
        </div>

        {/* Features Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '100px', textAlign: 'left' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>2-Minute Setup</h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>No coding required. Just paste your website link and we'll instantly generate your custom AI chatbot.</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Learns Your Business</h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>Upload your PDFs, pricing, and FAQs. The AI reads them and answers exactly like your best sales rep.</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>👨‍💻</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Live Human Takeover</h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>Monitor conversations in real-time and take over the chat manually whenever a high-ticket client arrives.</p>
          </div>
        </div>
      </main>

      {/* The Chatbot */}
      <Chatbot />
    </div>
  );
}
