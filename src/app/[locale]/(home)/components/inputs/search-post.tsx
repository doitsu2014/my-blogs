'use client';

import { SearchResultModel } from '@/app/api/posts/search/route';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState, useCallback, useRef } from 'react';

interface SearchPostsProps {
  className?: string;
}

const SearchPosts: React.FC<SearchPostsProps> = ({ className }) => {
  const translation = useTranslations('components.searchPosts');
  const locale = useLocale();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultModel[]>([]);
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSearchResults = async (value: string) => {
    const response = await fetch(`/api/posts/search?searchValue=${value}&locale=${locale}`);
    if (response.ok) {
      const data: SearchResultModel[] = await response.json();
      setSearchResults(data); // Update search results state
    } else {
      console.error('Error fetching search results');
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSearchResults, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleShortcut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
      setSearchResults([]); // Clear search results when clicking outside
    }
  };

  const handleFocus = () => {
    if (searchValue.trim() !== '') {
      debouncedSearch(searchValue); // Show results again when input is focused
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchInputRef}>
      <label className={`input w-full`}>
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor">
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
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          ref={inputElementRef}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      {searchResults.length > 0 && (
        <ul className="absolute z-50 bg-base-100 shadow-lg rounded-lg mt-2 lg:w-[calc(100%+12rem)] lg:left-[-6rem]">
          {searchResults.map((result, index) => (
            <li key={index} className="list-row p-2 hover:bg-base-200 flex items-center gap-4">
              {result.thumbnailPaths && (
                <img
                  src={result.thumbnailPaths[0]}
                  alt={result.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
              <div className="flex flex-col">
                <h1 className="font-semibold">{result.title}</h1>
                <div className='flex justify-between'>
                  <p className="flex justify-end text-xs my-auto text-gray-400">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                  <a href={`/${locale}/${result.categorySlug}/${result.slug}`} className="btn btn-primary p-2">View</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPosts;
