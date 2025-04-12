import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GradientColors } from '../../configs/app';
import { useTheme } from '../../contexts/theme';
import { formatDate } from '../../utils/dateTime';

const ChatsData = [
  {
    topic: 'Next.js Project Setup',
    msgCount: 25,
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    topic: 'AI Integration Help',
    msgCount: 42,
    time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    topic: 'React Performance Issues',
    msgCount: 18,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    topic: 'Database Schema Design',
    msgCount: 31,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    topic: 'Authentication Implementation',
    msgCount: 56,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    topic: 'API Development',
    msgCount: 29,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
  },
  {
    topic: 'Styling with Tailwind',
    msgCount: 15,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    topic: 'Testing Strategies',
    msgCount: 37,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
  },
  {
    topic: 'State Management Options',
    msgCount: 23,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
  {
    topic: 'Deployment Workflow',
    msgCount: 19,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
  },
];

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  const { accentColor } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col h-full ${className} border border-border-primary rounded-2xl py-4 px-5`}
    >
      <div className="flex items-center justify-between border-b border-border-primary pb-3">
        <h1 className="text-2xl font-bold text-text-primary">Chats</h1>
        <button className="flex justify-center items-center gap-1 py-2 px-3  rounded-lg cursor-pointer bg-accent-primary text-text-button-primary font-semibold text-sm ">
          <span>
            <PlusIcon className="w-4 h-4 " />
          </span>
          New chat
        </button>
      </div>

      <div className="border border-border-primary rounded-xl px-4 py-12 mb-10 flex flex-col items-center justify-center w-3/4 mr-auto ml-auto relative mt-10">
        <h1 className="text-2xl font-bold z-[2] text-text-primary">
          Welcome back, Sam
        </h1>
        <p className="text-base mb-6 z-[2] text-text-secondary">
          Start a new conversation. Your AI assistant is ready to help!
        </p>
        <div className="flex flex-row justify-between items-center px-2 py-2 gap-2 rounded-xl  w-1/2 bg-ai-prompt-send-background border border-border-primary z-[2]">
          <input
            type="text"
            placeholder="How can I help you?"
            className="w-full border-0 text-sm focus:outline-none pl-2 bg-transparent text-text-primary"
          />
          <button
            className="bg-accent-primary text-text-button-primary rounded-lg px-3 py-2"
            onClick={() => navigate('/chat/new')}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        <div
          className={`
                      blur-3xl
                      absolute 
                      bottom-8
                      left-1/2 
                      -translate-x-1/2
                      w-3/4
                      h-3/4
                      rounded-t-full
                      z-[1]
                      ${GradientColors[accentColor]}
                    `}
        ></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-3/4 mr-auto ml-auto  gap-5">
          <div className="flex justify-between items-center w-full">
            {/* TODO : ADD chat count */}
            <p className="text-base font-semibold text-text-primary">
              {' '}
              Chats(23)
            </p>
            <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-input-background border border-border-primary">
              <MagnifyingGlassIcon className="w-4 h-4 text-input-text" />
              <input
                placeholder="Search chats..."
                type="text"
                className="text-sm focus:outline-none  bg-input-background text-input-text"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            {/* Random chat cards */}
            {ChatsData.map((chat, index) => (
              <ChatCard
                key={index}
                topic={chat.topic}
                msgCount={chat.msgCount}
                time={chat.time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

interface ChatCardProps {
  topic: string;
  msgCount: number;
  time: Date | string | number;
}

export const ChatCard = ({ topic, msgCount, time }: ChatCardProps) => {
  return (
    <>
      {/* TODO : single Chat Card */}
      <div className="flex flex-row justify-between items-center bg-background-secondary border border-border-primary rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Chat Name */}
        <p className="font-semibold text-text-primary">{topic}</p>
        {/* Other data and functions */}
        <div className="flex justify-between items-center gap-4 text-text-secondary">
          <div className="flex items-center gap-1">
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <p>{msgCount}</p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <p>
              {formatDate(
                time instanceof Date ? time.toISOString() : String(time)
              )}
            </p>
          </div>
          <button>
            <EllipsisVerticalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
