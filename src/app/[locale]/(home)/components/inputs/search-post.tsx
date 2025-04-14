'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

interface SearchPostsProps {
  className?: string;
}

const SearchPosts: React.FC<SearchPostsProps> = ({ className }) => {
  const translation = useTranslations('components.searchPosts');

  const handleShortcut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <label className={`input ${className}`}>
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        id="search-input"
        type="search"
        className="grow"
        placeholder={translation('placeholder')}
        aria-label={translation('placeholder')}
      />
      <kbd className="kbd kbd-sm">⌘</kbd>
      <kbd className="kbd kbd-sm">K</kbd>
    </label>
  );
};

export default SearchPosts;