"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Minus, Plus } from 'lucide-react';
import Loading from "@/app/components/Loading";
import { clearContext, converseWithAI } from "@/app/actions/getResponse";

const ChatWindow = () => {
  // State and refs remain the same
  const [messages, setMessages] = useState<{ text: string; sender: string; isDone?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effects and handlers remain the same
  useEffect(() => {
    clearContext();
    setMessages([{ text: "Hi what problem are you facing", sender: 'bot' }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    const response = (await converseWithAI(input)) || '';
    const word = response?.split(" ")[0];
    const isDone = word === "SUMMARY:" || word === "SUMMARY";
    setMessages(prev => [...prev, { text: response, sender: 'bot', isDone }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatStyles = {
    container: {
      position: 'fixed' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      height: isMinimized ? '48px' : '600px',
      zIndex: 1000,
    },
    header: {
      background: '#2563eb',
      padding: '0.75rem',
      borderRadius: '0.75rem 0.75rem 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    messageArea: {
      height: '380px',
      padding: '1rem',
      overflowY: 'auto' as const,
      scrollBehavior: 'smooth' as const,
    },
    message: (isSender: boolean) => ({
      marginBottom: '0.75rem',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      maxWidth: '80%',
      marginLeft: isSender ? 'auto' : '0',
      marginRight: isSender ? '0' : 'auto',
      backgroundColor: isSender ? '#ebf5ff' : '#f3f4f6',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }),
    inputArea: {
      padding: '0.75rem',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      borderRadius: '0 0 0.75rem 0.75rem',
    },
    textarea: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      resize: 'none' as const,
      outline: 'none',
      transition: 'border-color 0.2s ease',
      minHeight: '2.5rem',
      maxHeight: '6rem',
      fontFamily: 'inherit',
    },
    sendButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-72"
      style={{
        position: "relative",
        width : "100%",
        height : "100vh",
        overflow: "hidden",
      }}
    >
      <video src="../../BV2.mp4" autoPlay loop muted style={{position : "absolute", width : "100%", height : "100vh" , objectFit : "cover", zIndex : -1}}></video>
    <div style={chatStyles.container}>
      <div style={chatStyles.header}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>Patient Chat</span>
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          {isMinimized ? <Plus size={20} /> : <Minus size={20} />}
        </button>
      </div>
      
      {!isMinimized && (
        <>
          <div style={chatStyles.messageArea}>
            {messages.map((msg, idx) => (
              <div key={idx} style={chatStyles.message(msg.sender === 'user')}>
                {msg.isDone ? (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Summary</h3>
                    {msg.text}
                  </div>
                ) : msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loading />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!messages.some(msg => msg.isDone) && (
            <div style={chatStyles.inputArea}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your response..."
                  style={chatStyles.textarea}
                  rows={2}
                />
                <button
                  onClick={handleSend}
                  style={chatStyles.sendButton}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default ChatWindow;