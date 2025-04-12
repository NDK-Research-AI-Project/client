import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentIcon,
  Cog6ToothIcon,
  Bars3Icon,
  PlusIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
interface NavItem {
  path: string;
  label: string;
  icon?: JSX.Element;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const navigationItems: NavItem[] = [
  {
    path: '/chat',
    label: 'Chat',
    icon: <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />,
  },
  {
    path: '/document',
    label: 'Documents',
    icon: <DocumentIcon className="w-5 h-5" />,
  },
  {
    path: '/glossary',
    label: 'Glossary',
    icon: <RectangleGroupIcon className="w-5 h-5" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`
         fixed left-0 top-0 h-screen  transition-all duration-300 p-3
        ${isCollapsed ? 'w-28' : 'w-72'}
      `}
    >
      <div className="bg-background-secondary text-text-primary p-4 flex flex-col justify-between rounded-2xl h-full border border-border-primary ">
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-hover p-2 rounded-lg flex justify-center items-center mb-5 mt-4"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        )}
        {!isCollapsed && (
          <div className="flex items-center justify-between  py-4 mb-5">
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-9 rounded-full"
                src="https://avatar.iran.liara.run/public"
                alt="Rounded avatar"
              />

              <div>
                <p className="text-md font-semibold">Sam Walton</p>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <button
                onClick={() => navigate('/settings')}
                className="hover:bg-gray-hover p-2 rounded-lg"
              >
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hover:bg-gray-hover p-2 rounded-lg"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <nav className="flex-grow overflow-y-auto flex flex-col justify-between">
          <div className="flex flex-col justify-between items-start w-full h-full">
            {/* navigation */}
            <div className="w-full">
              {' '}
              {navigationItems.map((item) => (
                <div
                  key={item.path}
                  className={`flex items-center justify-start gap-2  py-3 px-4 mb-2 rounded-lg cursor-pointer transition-colors 
            ${
              location.pathname.includes(item.path)
                ? 'bg-background-primary text-text-primary shadow-md font-semibold '
                : 'hover:bg-gray-hover'
            }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}

                  {!isCollapsed && (
                    <p className="transition-opacity duration-300">
                      {item.label}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* chat history */}
            <div></div>
          </div>
          {/* botton section */}
          <div className="w-full">
            {!isCollapsed && (
              <button className="flex justify-center items-center gap-3 py-2 px-4 mb-2 rounded-lg cursor-pointer bg-accent-primary w-full text-text-button-primary font-semibold ">
                <span>
                  <PlusIcon className="w-5 h-5" />
                </span>
                Start new chat
              </button>
            )}
            {isCollapsed && (
              <div className="flex flex-col items-center justify-between gap-5">
                <button
                  onClick={() => navigate('/settings')}
                  className="hover:bg-gray-hover p-2 rounded-lg"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                </button>
                <img
                  className="w-9 h-9 rounded-full mb-4"
                  src="https://avatar.iran.liara.run/public"
                  alt="Rounded avatar"
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
