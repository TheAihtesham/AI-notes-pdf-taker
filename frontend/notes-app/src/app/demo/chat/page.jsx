'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const MAX_QUESTIONS = 15;

export default function DemoChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I've read your PDF! Ask me anything about it." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionsLeft, setQuestionsLeft] = useState(MAX_QUESTIONS);
  const [filename, setFilename] = useState('');
  const [showPopup, setShowPopup] = useState(true); // popup open by default
  const bottomRef = useRef(null);

  useEffect(() => {
    const docId = localStorage.getItem('pdfsense_demo_docId');
    const name = localStorage.getItem('pdfsense_demo_filename');
    if (!docId) {
      router.replace('/demo');
      return;
    }
    setFilename(name || 'your PDF');
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading || questionsLeft === 0) return;

    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setLoading(true);
    setQuestionsLeft(q => q - 1);

    try {
      const docId = localStorage.getItem('pdfsense_demo_docId');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/demo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, question }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── Welcome Popup ── */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                👋
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">You're in Demo Mode</h2>
                <p className="text-xs text-gray-400">This is a limited preview of PDFsense</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-4" />

            {/* Differences list */}
            <p className="text-sm font-medium text-gray-700 mb-3">
              Here's how the demo differs from the full experience:
            </p>

            <ul className="space-y-3 mb-5">
              {[
                {
                  icon: '📄',
                  demo: '1 PDF upload only',
                  full: 'Unlimited PDF uploads',
                },
                {
                  icon: '💬',
                  demo: '15 questions per session',
                  full: 'Unlimited questions',
                },
                {
                  icon: '📝',
                  demo: 'No note-taking editor',
                  full: 'Full Tiptap rich text editor',
                },
                {
                  icon: '📚',
                  demo: 'No PDF history/sidebar',
                  full: 'All your PDFs saved & organized',
                },
                {
                  icon: '🔐',
                  demo: 'Session lost on browser clear',
                  full: 'Your data saved to your account',
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <div className="flex-1 text-sm">
                    <span className="text-red-500 line-through mr-2">{item.demo}</span>
                    <span className="text-green-600 font-medium">{item.full}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Continue demo
              </button>
              <a
                href="/register"
                className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl text-center hover:bg-blue-700 transition-colors"
              >
                Get full access →
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
            {filename}
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            Guest demo
          </span>
        </div>
        <a href="/register" className="text-xs text-blue-500 font-medium hover:underline">
          Sign up for unlimited →
        </a>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              msg.role === 'ai' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {msg.role === 'ai' ? 'AI' : 'U'}
            </div>
            <div className={`max-w-[75%] text-sm px-4 py-2.5 rounded-2xl leading-relaxed ${
              msg.role === 'ai'
                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                : 'bg-blue-600 text-white rounded-tr-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">AI</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-400 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Question limit warnings ── */}
      {questionsLeft <= 2 && questionsLeft > 0 && (
        <div className="bg-amber-50 border-t border-amber-100 px-4 py-2 text-center text-xs text-amber-700 max-w-2xl mx-auto w-full">
          {questionsLeft} question{questionsLeft === 1 ? '' : 's'} left in demo.{' '}
          <a href="/register" className="font-medium underline">Sign up free for unlimited →</a>
        </div>
      )}

      {questionsLeft === 0 && (
        <div className="bg-blue-50 border-t border-blue-100 px-4 py-3 text-center max-w-2xl mx-auto w-full">
          <p className="text-sm text-blue-700 font-medium mb-1">You've reached the demo limit.</p>
          <a href="/register" className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 inline-block">
            Create a free account to continue →
          </a>
        </div>
      )}

      {/* ── Input ── */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 max-w-2xl mx-auto w-full">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            disabled={loading || questionsLeft === 0}
            placeholder={questionsLeft === 0 ? 'Demo limit reached' : 'Ask a question about your PDF...'}
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400 disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading || questionsLeft === 0 || !input.trim()}
            className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ↑
          </button>
        </div>
      </div>

    </div>
  );
}