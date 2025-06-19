import { ArrowPathIcon, EllipsisVerticalIcon, PlusIcon, ShareIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../../services/api/chat/chatServices';
import { showError } from '../../utils/toaster';
import { GradientColors } from '../../configs/app';
import { useTheme } from '../../contexts/theme';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useParams, useNavigate } from 'react-router-dom';
import { sendChatMessageToSession, getChatHistory, createChatSession, deleteChatSession } from '../../services/api/chat/chatServices';
import aiImage from '../../assets/ai-logo.png';
import manImage from '../../assets/man.png';

enum senderType {
  ai = 'ai',
  user = 'user',
}

interface Message {
  id: string;
  text: string;
  sender: senderType;
  timestamp: Date;
  explanation?: string[];
}

interface ChatProps {
  className?: string;
}

const NewChat: React.FC<ChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { accentColor } = useTheme();
  const { sessionId: urlSessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  // Load chat history if sessionId exists
  useEffect(() => {
    if (urlSessionId) {
      setSessionId(urlSessionId);
      loadChatHistory(urlSessionId);
    }
  }, [urlSessionId]);

  const loadChatHistory = async (chatSessionId: string) => {
    try {
      setLoading(true);
      const response = await getChatHistory(chatSessionId);

      if (response.error) {
        showError('Failed to load chat history: ' + response.error);
        return;
      }

      if (response.data) {
        const formattedMessages: Message[] = response.data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.role === 'user' ? senderType.user : senderType.ai,
          timestamp: new Date(msg.timestamp),
          explanation: msg.explanation || [], // Optional field for explanations
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      showError('Failed to load chat history');
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: senderType.user,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setLoading(true);

    try {
      let response;

      if (sessionId) {
        // Send to existing session
        response = await sendChatMessageToSession(sessionId, {
          question: currentMessage,
        });
      } else {
        // Create new session and send message
        response = await sendChatMessage({
          question: currentMessage,
        });

        // If we got a session_id back, update our state and URL
        if (response.data?.session_id) {
          const newSessionId = response.data.session_id;
          setSessionId(newSessionId);
          navigate(`/chat/${newSessionId}`, { replace: true });
        }
      }

      if (response.error) {
        showError(response.error);
        console.error('Error sending message:', response.error);
        return;
      }

      if (response.data) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.answer,
          sender: senderType.ai,
          timestamp: new Date(),
          explanation: response.data.explanation || [], // Optional field for explanations
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      showError('Failed to send message');
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await createChatSession();
      if (response.error) {
        showError('Failed to create new chat: ' + response.error);
        return;
      }

      if (response.data) {
        navigate(`/chat/${response.data.session_id}`);
        setSessionId(response.data.session_id);
        setMessages([]);
      }
    } catch (error) {
      showError('Failed to create new chat');
      console.error('Error creating new chat:', error);
    }
  };

  const handleDeleteChat = async () => {
    if (!sessionId) return;

    try {
      const response = await deleteChatSession(sessionId);
      if (response.error) {
        showError('Failed to delete chat: ' + response.error);
        return;
      }

      navigate('/chat');
    } catch (error) {
      showError('Failed to delete chat');
      console.error('Error deleting chat:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col h-full ${className} border border-border-primary rounded-2xl py-4 px-5 relative`}>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-primary border border-border-primary rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Delete Chat</h3>
            <p className="text-text-secondary mb-6">Are you sure you want to delete this chat? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg border border-border-primary text-text-secondary hover:bg-background-secondary">
                Cancel
              </button>
              <button onClick={handleDeleteChat} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="flex items-center justify-between mb-4 border-b border-border-primary pb-3 z-[2]">
        <h1 className="text-2xl font-bold text-text-primary">{'Chat'}</h1>

        <div className="flex items-center gap-1">
          <button onClick={handleNewChat} className="flex justify-center items-center gap-1 py-2 px-3 mr-2 rounded-lg cursor-pointer bg-accent-primary text-text-button-primary font-semibold text-sm ">
            <PlusIcon className="w-4 h-4 " />
            New chat
          </button>
          <div className="border-r border-border-primary h-6"></div>
          {sessionId && (
            <button onClick={() => setShowDeleteConfirm(true)} className="p-1 rounded-lg hover:bg-gray-hover text-text-secondary">
              <TrashIcon className="w-5 h-5 cursor-pointer" />
            </button>
          )}
          <button className="p-1 rounded-lg hover:bg-gray-hover text-text-secondary">
            <ShareIcon className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 z-[2] ">
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full relative">
            {/* Decorative gradient background */}
            <div className={`absolute inset-0 ${GradientColors[accentColor]} opacity-5 blur-3xl rounded-full`}></div>

            {/* Main content */}
            <div className="relative z-10 text-center">
              {/* AI Avatar */}
              <div className="mb-6">
                <img className="w-16 h-16 rounded-full mx-auto shadow-xl border-2 border-accent-primary/20" src={aiImage} alt="AI Assistant" />
              </div>

              {/* Welcome message */}
              <h2 className="text-3xl font-bold text-text-primary mb-3">Hey there! 👋</h2>
              <p className="text-lg text-text-secondary font-medium mb-8 max-w-md mx-auto leading-relaxed">How can I help you today? Ask me anything and let's get started!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => <MessageBlock key={message.id} message={message} />)
        )}
        {loading && (
          <div className="flex items-center justify-center gap-2 w-full mx-auto">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-accent-primary rounded-full animate-bounce"></div>
            </div>
            <span className="text-text-secondary text-sm">Your AI is thinking...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input field for sending messages */}
      <form onSubmit={handleSendMessage} className="border-t border-border-primary p-4 z-[2]">
        <div className="flex flex-row justify-between items-center px-3 py-3 gap-2 rounded-xl shadow-md w-full bg-ai-prompt-send-background border border-border-primary ">
          <input type="text" placeholder="How can I help you today?" className="w-full border-0 text-sm focus:outline-none pl-2 bg-transparent text-text-primary" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <button className="flex justify-center items-center gap-2 py-2 px-3 mr-2 rounded-lg cursor-pointer bg-accent-primary text-text-button-primary font-semibold text-sm " type="submit" disabled={loading}>
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
  const [showExplanation, setShowExplanation] = useState(false);
  return (
    <div className={`mb-8`}>
      {message.sender === 'user' && (
        <div className="flex items-start gap-2 text-sm p-2 w-3/4 mx-auto px-11">
          <img className="w-7 h-7 rounded-full mb-4" src={manImage} alt="Rounded avatar" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-text-primary">Sam Walton</p>
              <div className="border-r h-6 border-border-primary"></div>
              <p className="text-text-secondary">{message.timestamp.toLocaleTimeString()}</p>
            </div>

            <p className="text-base text-text-secondary mt-2">{message.text}</p>
          </div>
        </div>
      )}

      {message.sender === 'ai' && (
        <div className="flex flex-col justify-start items-start gap-2 text-sm bg-ai-answer-background border border-border-primary py-8 px-10 rounded-xl  w-3/4 mx-auto ">
          <div className="flex items-start justify-start gap-2 text-sm overflow-x-hidden">
            <img className="w-7 h-7 rounded-full mb-4" src={aiImage} alt="Rounded avatar" />
            <div className="flex flex-col overflow-x-hidden">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-text-primary">Your AI</p>
                <div className="border-r h-6"></div>
                <p className="text-text-secondary">{message.timestamp.toLocaleTimeString()}</p>
              </div>

              {/* AI Explanation Dropdown */}
              <div className="mt-4 mb-2">
                <button onClick={() => setShowExplanation(!showExplanation)} className="flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:text-text-primary bg-background-secondary hover:bg-background-tertiary border border-border-primary rounded-lg transition-colors">
                  <span>AI Explanation Process</span>
                  <svg className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showExplanation && (
                  <div className="mt-3 p-4 bg-background-secondary border border-border-primary rounded-2xl  max-h-96  overflow-y-auto">
                    <div className="space-y-2">
                      {message?.explanation?.map((msg, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-5 h-5 bg-accent-primary text-text-button-primary text-xs rounded-full flex items-center justify-center mt-0.5">{index + 1}</span>
                          <div className="prose prose-sm max-w-none text-text-secondary mb-2">
                            <ReactMarkdown>{msg}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="prose prose-base w-[95%] text-text-primary mt-5">
                <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="w-full inline-flex justify-end items-center gap-2 mt-2">
            <button className=" p-1 rounded-lg  hover:bg-gray-hover text-text-secondary">
              <ArrowPathIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-hover text-text-secondary">
              <ShareIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-hover text-text-secondary">
              <Square2StackIcon className="w-5 h-5 cursor-pointer" />
            </button>
            <button className=" p-1 rounded-lg  hover:bg-gray-hover text-text-secondary">
              <EllipsisVerticalIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
