import React, { useState } from 'react';
import Header from './components/Header';
import PostCreator from './components/PostCreator';
import HomeScreen from './components/HomeScreen';
import UserSelectionScreen from './components/UserSelectionScreen';
import { Post, PostData, User } from './types';
import { mockUsers } from './constants';


const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'creator'>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handlePostCreated = (postData: Omit<PostData, 'author'>) => {
    if (!currentUser) return;

    const newPost: Post = {
      ...postData,
      author: currentUser,
      id: Math.random().toString(36).substring(2, 10),
      liked: false,
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setView('home');
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  if (!currentUser) {
    return <UserSelectionScreen users={mockUsers} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        currentView={view} 
        onBack={() => setView('home')} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full flex justify-center">
        {view === 'home' && (
          <HomeScreen 
            posts={posts} 
            onNavigateToCreator={() => setView('creator')}
            onToggleLike={handleToggleLike}
          />
        )}
        {view === 'creator' && <PostCreator onPostCreated={handlePostCreated} currentUser={currentUser} />}
      </main>
    </div>
  );
};

export default App;