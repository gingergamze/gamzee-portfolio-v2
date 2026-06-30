'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello My name is Sunny 🌞, ask me anything about Gamze's work. I am here to help!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div style={{ position: 'fixed', bottom: '120px', right: '24px', zIndex: 50 }}
          className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-fade-in">
          Ask me anything ✦
          <div className="absolute bottom-[-5px] right-4 w-2 h-2 bg-zinc-900 rotate-45"></div>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{ position: 'fixed', bottom: '120px', right: '24px', zIndex: 50, height: '480px', maxHeight: 'calc(100vh - 220px)', animation: 'slideUp 0.3s ease-out' }}
          className="chat-panel w-80 sm:w-96 bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-white">
            <div className="flex items-center gap-2">
              <Image src="/sun.png" alt="Gamze" width={28} height={28} className="rounded-full sun-spin" />
              <div>
                <p className="text-sm font-semibold text-zinc-900">Gamze's Portfolio</p>
                <p className="text-xs text-zinc-400">Ask me anything</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-700 transition-colors text-lg leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-white rounded-br-sm'
                    : 'bg-slate-100 text-zinc-700 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-zinc-400 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-zinc-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about my work..."
              className="flex-1 text-sm bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 transition-colors text-zinc-800 placeholder-zinc-400"
            />
            <button
              onClick={sendMessage}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-3 py-2 text-sm transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{ width: '88px', height: '88px', position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}
        className="rounded-full shadow-lg flex items-center justify-center bg-white border border-zinc-200 hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        <Image src="/sun.png" alt="chat" width={72} height={72} className="rounded-full sun-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', animation: 'orbit 8s linear infinite', zIndex: 51 }}>
          <span style={{ display: 'block', width: '10px', height: '10px', background: '#f59e0b', borderRadius: '50%', border: '2px solid white' }}></span>
        </div>
      </button>
    </>
  );
}