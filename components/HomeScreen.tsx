import React, { useState } from 'react';
import { Post } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import PostCard from './PostCard';
import { ListIcon } from './icons/ListIcon';
import { ImageIcon } from './icons/ImageIcon';
import { VideoIcon } from './icons/VideoIcon';
import { HeartIcon } from './icons/HeartIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HomeScreenProps {
  posts: Post[];
  onNavigateToCreator: () => void;
  onToggleLike: (postId: string) => void;
}

type FilterType = 'all' | 'image' | 'video' | 'liked';

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200";
  const activeClasses = "bg-purple-600 text-white shadow-md";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
      <span>{label}</span>
    </button>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, onNavigateToCreator, onToggleLike }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const filterMatch = (
      (activeFilter === 'image' && post.type === 'image') ||
      (activeFilter === 'video' && post.type === 'video') ||
      (activeFilter === 'liked' && post.liked) ||
      activeFilter === 'all'
    );

    const searchMatch = (
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filterMatch && searchMatch;
  });

  return (
    <div className="w-full h-full relative flex-grow flex flex-col">
      {posts.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              アフィリエイト投稿
            </span>
            をはじめよう
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            魅力的な投稿を作成して、アフィリエイトリンクを共有しましょう。
            画像や動画をアップロードして、AIが生成したキャプションを試すこともできます。
          </p>
          <button
            onClick={onNavigateToCreator}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            最初の投稿を作成する
          </button>
        </div>
      ) : (
        <>
          <div className="w-full max-w-lg mx-auto space-y-6 mb-8 animate-fade-in">
            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="キャプションを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-400 pl-11 pr-4 py-3"
              />
            </div>
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <FilterButton label="すべて" isActive={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
                <ListIcon className="w-5 h-5" />
              </FilterButton>
              <FilterButton label="画像" isActive={activeFilter === 'image'} onClick={() => setActiveFilter('image')}>
                <ImageIcon className="w-5 h-5" />
              </FilterButton>
              <FilterButton label="動画" isActive={activeFilter === 'video'} onClick={() => setActiveFilter('video')}>
                <VideoIcon className="w-5 h-5" />
              </FilterButton>
              <FilterButton label="いいね" isActive={activeFilter === 'liked'} onClick={() => setActiveFilter('liked')}>
                <HeartIcon isLiked={activeFilter === 'liked'} className="w-5 h-5" />
              </FilterButton>
            </div>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="w-full max-w-lg mx-auto space-y-8 pb-24">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onToggleLike={onToggleLike} />
              ))}
            </div>
          ) : (
             <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-400 animate-fade-in">
              <h3 className="text-xl font-semibold mb-2">投稿が見つかりません</h3>
              <p>検索条件やフィルターに一致する投稿はありません。</p>
              <button 
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }} 
                className="mt-4 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                検索とフィルターをリセット
              </button>
            </div>
          )}
        </>
      )}
      
      {posts.length > 0 && (
        <button
          onClick={onNavigateToCreator}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg shadow-purple-500/30 transform hover:scale-110 transition-transform duration-300 ease-in-out"
          aria-label="新しい投稿を作成"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default HomeScreen;