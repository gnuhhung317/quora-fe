import React from 'react';
import AddQuestionButton from '../common/AddQuestionButton';
import UserAvatar from '../common/UserAvatar';
import Navigation from '../common/Navigation';
import SearchBar from '../common/SearchBar';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-2 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-4">
          <img src="/images/logo.png" alt="QueryHub Logo" className="h-8" />
          <Navigation />
        </div>
        <SearchBar />
        <div className="flex items-center space-x-4">
          <AddQuestionButton />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}