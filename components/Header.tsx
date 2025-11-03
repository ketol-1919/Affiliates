import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { User } from '../types';

interface HeaderProps {
  currentView: 'home' | 'creator';
  onBack: () => void;
  currentUser: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onBack, currentUser, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between h-14">
        <div className="w-1/3 flex justify-start">
          {currentView === 'creator' && (
            <button 
              onClick={onBack} 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="戻る"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="w-1/3 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 inline-block whitespace-nowrap">
            アフィリエイト投稿
          </h1>
        </div>
        <div className="w-1/3 flex justify-end items-center gap-3">
           <div className="flex items-center gap-2">
             <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full border-2 border-gray-600" />
             <span className="text-sm font-semibold hidden md:inline">{currentUser.name}</span>
           </div>
           <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="ログアウト">
             <LogoutIcon className="w-6 h-6" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;