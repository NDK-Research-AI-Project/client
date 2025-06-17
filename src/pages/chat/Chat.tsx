import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradientColors } from '../../configs/app';
import { useTheme } from '../../contexts/theme';
import { formatDate } from '../../utils/dateTime';
import { getChatSessions, createChatSession } from '../../services/api/chat/chatServices';

/*
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
*/

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  const { accentColor } = useTheme();
  const navigate = useNavigate();
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch chat sessions on component mount
  useEffect(() => {
    fetchChatSessions();
  }, []);

  const fetchChatSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getChatSessions();
      
      if (response.error) {
        setError(response.error);
        //setChatSessions(ChatsData); // Fallback to mock data
      } else if (response.data) {
        setChatSessions(response.data.sessions);
      }
    } catch (err) {
      console.error('Error fetching chat sessions:', err);
      setError('Failed to load chat sessions');
      //setChatSessions(ChatsData); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewChat = async () => {
    try {
      const response = await createChatSession();
      if (response.error) {
        console.error('Error creating chat session:', response.error);
        // Fallback to /chat/new route
        navigate('/chat/new');
      } else if (response.data) {
        navigate(`/chat/${response.data.session_id}`);
      }
    } catch (err) {
      console.error('Error creating new chat:', err);
      navigate('/chat/new');
    }
  };

  const handleStartNewChatFromPrompt = async () => {
    try {
      const response = await createChatSession();
      if (response.error) {
        navigate('/chat/new');
      } else if (response.data) {
        navigate(`/chat/${response.data.session_id}`);
      }
    } catch (err) {
      navigate('/chat/new');
    }
  };

  const handleChatCardClick = (sessionId: string) => {
    navigate(`/chat/${sessionId}`);
  };

  // Filter chats based on search term
  const filteredChats = chatSessions.filter(chat => {
    // For API data, we don't have topic, so we'll use session_id or create a topic from first message
    const searchableText = chat.topic || chat.session_id || '';
    return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div
      className={`flex flex-col h-full ${className} border border-border-primary rounded-2xl py-4 px-5`}
    >
      <div className="flex items-center justify-between border-b border-border-primary pb-3">
        <h1 className="text-2xl font-bold text-text-primary">Chats</h1>
        <button 
          onClick={handleCreateNewChat}
          className="flex justify-center items-center gap-1 py-2 px-3  rounded-lg cursor-pointer bg-accent-primary text-text-button-primary font-semibold text-sm "
        >
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
            onClick={handleStartNewChatFromPrompt}
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
            <p className="text-base font-semibold text-text-primary">
              Chats({loading ? '...' : filteredChats.length})
            </p>
            <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-input-background border border-border-primary">
              <MagnifyingGlassIcon className="w-4 h-4 text-input-text" />
              <input
                placeholder="Search chats..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm focus:outline-none  bg-input-background text-input-text"
              />
            </div>
          </div>

          {error && (
            <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error} - Showing cached data
            </div>
          )}

          {loading ? (
            <div className="flex flex-col w-full gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse bg-background-secondary border border-border-primary rounded-lg p-4 w-full">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full gap-2">
              {filteredChats.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                  {searchTerm ? 'No chats found matching your search.' : 'No chat sessions yet. Start a new conversation!'}
                </div>
              ) : (
                filteredChats.map((chat, index) => (
                  <ChatCard
                    key={chat.session_id || index}
                    sessionId={chat.session_id}
                    topic={chat.topic || `Chat ${chat.session_id?.slice(-8)}`}
                    msgCount={chat.message_count}
                    time={chat.last_message_time || chat.time}
                    onClick={handleChatCardClick}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

interface ChatCardProps {
  sessionId: string;
  topic: string;
  msgCount: number;
  time: Date | string | number;
  onClick?: (id: string) => void;
}

export const ChatCard = ({ sessionId, topic, msgCount, time, onClick }: ChatCardProps) => {
  return (
    <div 
      className="flex flex-row justify-between items-center bg-background-secondary border border-border-primary rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
      onClick={() => onClick?.(sessionId)}
    >
      <p className="font-semibold text-text-primary">{topic}</p>
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
        <button onClick={(e) => e.stopPropagation()}>
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
