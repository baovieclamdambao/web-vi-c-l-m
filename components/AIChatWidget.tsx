import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatSession } from "@google/genai";
import { ChatMessage } from '../types';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Chào bạn! Tôi là trợ lý AI Vua Việc Làm. Bạn cần tư vấn tìm việc hay viết CV?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSession) {
      try {
        const session = createChatSession();
        setChatSession(session);
      } catch (e) {
        console.error("Failed to init chat session", e);
      }
    }
  }, [isOpen, chatSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(chatSession, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Có lỗi xảy ra, vui lòng thử lại.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button with Pulse effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'hidden' : 'flex'} items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full shadow-2xl hover:shadow-brand-500/50 transition-all transform hover:scale-110 relative group`}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20"></div>
        <Bot size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-80 sm:w-96 flex flex-col h-[550px] border border-gray-100 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-4 flex justify-between items-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Sparkles size={20} className="text-accent-300" />
              </div>
              <div>
                <h3 className="font-bold text-base">AI Career Advisor</h3>
                <p className="text-xs text-brand-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 p-1 rounded-full hover:bg-white/20">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={16} className="text-brand-600" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={16} className="text-brand-600" />
                  </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin text-brand-500" />
                   <span className="text-xs text-gray-500 font-medium">AI đang soạn tin...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi bất cứ điều gì..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 py-2"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-white bg-brand-600 p-2 rounded-xl hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-500/20"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Được hỗ trợ bởi Google Gemini AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};