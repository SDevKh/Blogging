'use client';

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          title="Search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
