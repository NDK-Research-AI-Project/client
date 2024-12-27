import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  ShareIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { mockAIResponses } from '../../data/mockData';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response after delay
    const randomResponse =
      mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={`flex flex-col h-full ${className} border border-[#e3e6ea] rounded-2xl py-4 px-5 relative`}
    >
      <div
        className="
                      blur-3xl
                      absolute 
                      bottom-8
                      left-1/2 
                      -translate-x-1/2
                      w-3/4
                      h-3/4
                      rounded-t-full
                      z-[-2]
                      bg-[radial-gradient(circle_at_bottom,rgba(50,119,251,0.2)_55%,rgba(130,150,254,0.15)_40%,rgba(135,180,255,0.1)_80%,rgba(255,255,255,0)_100%)]
                    "
      ></div>
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h1 className="text-2xl font-bold">Lorem ipsum dolor sit</h1>

        <div className="flex items-center gap-1">
          <button className="flex justify-center items-center gap-1 py-2 px-3 mr-2 rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm ">
            <PlusIcon className="w-4 h-4 " />
            New chat
          </button>
          <div className="border-r h-6"></div>
          <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
            <TrashIcon className="w-5 h-5 cursor-pointer" />
          </button>
          <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
            <ShareIcon className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBlock key={message.id} message={message} />
        ))}
        <div ref={scrollRef} /> {/* Scroll to this div */}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex flex-row justify-between items-center px-3 py-3 gap-2 rounded-xl shadow-md w-full bg-white">
          <input
            type="text"
            placeholder="How can I help you today?"
            className="w-full border-0 text-sm focus:outline-none pl-2 "
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="flex justify-center items-center gap-2 py-2 px-3 mr-2 rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm "
            type="submit"
          >
            Send
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewChat;

export const MessageBlock: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`mb-8`}>
      {message.sender === 'user' && (
        <div className="flex items-start gap-2 text-sm p-2">
          <img
            className="w-7 h-7 rounded-full mb-4"
            src="https://avatar.iran.liara.run/public"
            alt="Rounded avatar"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Sam Walton</p>
              <div className="border-r h-6"></div>
              <p className="text-[#666f8d]">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            <p className="text-sm text-[#666f8d] mt-2">{message.text}</p>
          </div>
        </div>
      )}

      {message.sender === 'ai' && (
        <div className="flex flex-col justify-start items-start gap-2 text-sm shadow-lg p-5 rounded-xl bg-white ">
          <div className="flex items-start gap-2 text-sm ">
            <img
              className="w-7 h-7 rounded-full mb-4"
              src="https://avatar.iran.liara.run/public/job/operator/male"
              alt="Rounded avatar"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="font-semibold">Your AI</p>
                <div className="border-r h-6"></div>
                <p className="text-[#666f8d]">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              <p className="text-sm text-[#666f8d] mt-2">{message.text}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
              <ArrowPathIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
              <ShareIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
              <Square2StackIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-200 text-[#666f8d]">
              <EllipsisVerticalIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
