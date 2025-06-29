import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, Home, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-200"
            >
              <PenTool className="h-5 w-5 text-blue-400" />
              <span>BlogCraft</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-white/10 text-blue-400' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/admin') 
                  ? 'bg-white/10 text-blue-400' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;