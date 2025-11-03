import React from 'react';
import { User } from '../types';

interface UserSelectionScreenProps {
  users: User[];
  onLogin: (user: User) => void;
}

const UserSelectionScreen: React.FC<UserSelectionScreenProps> = ({ users, onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          アカウントを選択
        </h1>
        <p className="text-gray-400 mt-4 text-lg">どのアカウントで続けますか？</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onLogin(user)}
            className="flex flex-col items-center gap-4 cursor-pointer group"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 group-hover:border-purple-500 transition-all duration-300 transform group-hover:scale-110"
            />
            <span className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
              {user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSelectionScreen;