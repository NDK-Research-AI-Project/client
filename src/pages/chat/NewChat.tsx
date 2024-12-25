import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatProps {
  className?: string;
}

const NewChat: React.FC<ChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <div
      className={`flex flex-col h-full ${className} border border-[#e3e6ea] rounded-2xl py-4 px-5`}
    >
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h1 className="text-2xl font-bold">Chats</h1>
        <button className="flex justify-center items-center gap-1 py-2 px-3 mb-2 rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm ">
          <span>
            <PlusIcon className="w-4 h-4 " />
          </span>
          New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewChat;
