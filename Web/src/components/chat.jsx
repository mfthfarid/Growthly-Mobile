import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

// Komponen untuk Bubble Chat
const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      <div className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md break-words ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white/80 text-gray-800 rounded-bl-none'}`}>
        {message.text}
      </div>
      {isUser && (
        <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
      )}
    </div>
  );
};


const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Halo! Saya Asisten Growthly. Ada yang bisa saya bantu seputar gizi dan tumbuh kembang anak?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Fungsi untuk scroll otomatis ke pesan terakhir
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  // Fungsi untuk mengirim pesan ke Gemini AI
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // --- LOGIKA PANGGILAN API GEMINI ---
    const systemPrompt = "Anda adalah Asisten Growthly, seorang ahli gizi virtual yang ramah dan informatif. Spesialisasi Anda adalah stunting, gizi anak, dan tumbuh kembang. Berikan jawaban yang jelas, singkat, dan mudah dipahami oleh orang tua. Selalu gunakan bahasa Indonesia.";
    
    // Riwayat chat untuk konteks
    const history = chatMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const payload = {
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const apiKey = ""; // API key tidak diperlukan untuk model Flash di lingkungan ini
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const botReply = result.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak mengerti. Bisa coba tanyakan hal lain?";
      
      setChatMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setChatMessages(prev => [...prev, { sender: "bot", text: "Maaf, terjadi sedikit gangguan. Silakan coba beberapa saat lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tombol Chat Melayang */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-green-400 via-pink-400 to-blue-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
          aria-label="Buka Chat"
        >
          {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        </button>
      </div>

      {/* Jendela Chat */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] flex flex-col bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl transition-all duration-500 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-white/30">
          <h3 className="text-xl font-bold text-center text-gray-800">Asisten Growthly</h3>
        </div>

        {/* Area Pesan */}
        <div className="flex-grow p-4 overflow-y-auto">
          {chatMessages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 my-4 justify-start">
               <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
               </div>
               <div className="px-4 py-3 rounded-2xl bg-white/80 text-gray-800 rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500"/>
                  <span className="text-gray-500">Mengetik...</span>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <div className="flex-shrink-0 p-4 border-t border-white/30">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-grow p-3 rounded-full bg-white/90 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
              disabled={isLoading}
              aria-label="Kirim Pesan"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
