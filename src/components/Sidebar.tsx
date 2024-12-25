import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const navigationItems: NavItem[] = [
  { path: '/chat', label: 'Chat' },
  { path: '/document', label: 'Documents' },
  { path: '/settings', label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}): JSX.Element => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 w-full text-right hover:bg-gray-700 transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className="p-4">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              block py-2 px-4 mb-2 rounded transition-colors
              ${
                location.pathname === item.path
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700'
              }
              ${isCollapsed ? 'text-center' : 'text-left'}
            `}
          >
            {isCollapsed ? item.label.charAt(0) : item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
