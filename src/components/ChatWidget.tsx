import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Headset } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isAutoReply?: boolean;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('history', (history: Message[]) => {
      setMessages(history);
    });

    newSocket.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.sender === 'NDSPL Support') {
        setIsTyping(false);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit('message', { text: message, sender: 'Guest' });
    setMessage('');
    
    // Show typing indicator if we expect a reply (e.g., hello/hi)
    const lower = message.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('help')) {
      setIsTyping(true);
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Headset className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">NDSPL Support</div>
                  <div className="flex items-center text-[10px] text-brand-100 uppercase tracking-widest font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                id="close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50/50"
            >
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="text-slate-400 w-8 h-8" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Hello! How can we assist you with NDSPL technology solutions today?</p>
                </div>
              )}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'NDSPL Support' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === 'NDSPL Support' 
                      ? 'bg-white text-slate-700 border border-slate-100' 
                      : 'bg-brand-600 text-white'
                  }`}>
                    <div className="text-[10px] opacity-70 mb-1 font-bold uppercase tracking-tighter">
                      {msg.sender === 'NDSPL Support' ? 'Support' : 'You'}
                    </div>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className="text-[9px] opacity-50 mt-1 text-right">
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-5 py-3 pr-12 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                  id="chat-input"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-1.5 top-1.5 w-9 h-9 flex items-center justify-center bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 transition-all"
                  id="send-message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-slate-400 text-center mt-3 uppercase tracking-widest font-bold">
                NDSPL Real-time Customer Support
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-600 text-white rounded-full shadow-xl shadow-brand-500/30 flex items-center justify-center relative overflow-hidden group"
        id="toggle-chat"
      >
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
        {isOpen ? <X className="w-7 h-7 relative z-10" /> : <MessageCircle className="w-7 h-7 relative z-10" />}
      </motion.button>
    </div>
  );
};
