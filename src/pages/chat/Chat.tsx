import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  return (
    <div
      className={`flex flex-col h-full ${className} border border-[#e3e6ea] rounded-2xl py-4 px-5`}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-2xl font-bold">Chats</h1>
        <button className="flex justify-center items-center gap-1 py-2 px-3  rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm ">
          <span>
            <PlusIcon className="w-4 h-4 " />
          </span>
          New chat
        </button>
      </div>

      <div className="border rounded-xl px-4 py-12 mb-10 flex flex-col items-center justify-center w-3/4 mr-auto ml-auto relative mt-10">
        <h1 className="text-2xl font-bold">Welcome back, Sam</h1>
        <p className="text-sm mb-6">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed
        </p>
        <div className="flex flex-row justify-between items-center px-2 py-2 gap-2 rounded-xl shadow-md w-1/2 bg-white">
          <input
            type="text"
            placeholder="How can I help you?"
            className="w-full border-0 text-sm focus:outline-none pl-2 "
          />
          <button className="bg-[#2777fb] text-white rounded-lg px-3 py-2">
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
                      z-[-2]
                      bg-[radial-gradient(circle_at_bottom,rgba(50,119,251,0.2)_55%,rgba(130,150,254,0.15)_40%,rgba(135,180,255,0.1)_80%,rgba(255,255,255,0)_100%)]
                    "
        ></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-3/4 mr-auto ml-auto  gap-5">
          <div className="flex justify-between items-center w-full">
            {/* TODO : ADD chat count */}
            <p className="text-base font-semibold"> Chats(23)</p>
            <div className="flex items-center gap-2 justify-start px-3 py-3 shadow-md rounded-lg  bg-white">
              <MagnifyingGlassIcon className="w-4 h-4" />

              <input
                placeholder="Search for chats..."
                type="text"
                className="text-sm focus:outline-none"
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
      <div className="flex flex-row justify-between items-center bg-white shadow-lg rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Chat Name */}
        <p className="font-semibold ">
          Lorem ipsum dolor sit amet consectetur adipisc
        </p>
        {/* Other data and functions */}
        <div className="flex justify-between items-center gap-4 text-[#666f8d]">
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
