import React from 'react';

export default function TopBar() {
  return (
    <>
      <div className="flex items-center justify-between py-2 bg-base-100 text-primary-content">
        <div className="flex-grow"></div>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-primary transition-all duration-300 ease-in-out pl-10 w-0 opacity-0 group-hover:w-48 group-hover:opacity-100 focus:w-48 focus:opacity-100"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full cursor-pointer border border-primary group-hover:border-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>
      <hr />
    </>
  );
}
