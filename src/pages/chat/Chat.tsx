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

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
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
        <p className="text-sm mb-6 z-[2] text-text-secondary">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed
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
          className="
                      blur-xl
                      absolute 
                      bottom-0 
                      left-1/2 
                      -translate-x-1/2
                      w-3/4
                      h-3/4
                      rounded-t-full
                      z-[1]
                      bg-[radial-gradient(circle_at_bottom,rgba(50,119,251,0.2)_55%,rgba(130,150,254,0.15)_40%,rgba(135,180,255,0.1)_80%,rgba(255,255,255,0)_100%)]
                    "
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
            {/* TODO : single Chat Card */}
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

export const ChatCard = () => {
  return (
    <>
      {/* TODO : single Chat Card */}
      <div className="flex flex-row justify-between items-center bg-background-secondary border border-border-primary rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Chat Name */}
        <p className="font-semibold text-text-primary">
          Lorem ipsum dolor sit amet consectetur adipisc
        </p>
        {/* Other data and functions */}
        <div className="flex justify-between items-center gap-4 text-text-secondary">
          <div className="flex items-center gap-1">
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <p>24</p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <p>2 mins ago</p>
          </div>
          <button>
            <EllipsisVerticalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
