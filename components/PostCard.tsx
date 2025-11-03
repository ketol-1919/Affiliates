import React from 'react';
import { Post } from '../types';
import { LinkIcon } from './icons/LinkIcon';
import { HeartIcon } from './icons/HeartIcon';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      {/* Card Header */}
      <div className="flex items-center p-3 border-b border-gray-700/50">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-3 font-semibold text-gray-100">{post.author.name}</span>
      </div>
      
      {/* Media */}
      <div className="w-full aspect-square bg-black flex items-center justify-center">
        {post.type === 'image' && post.previewUrl && (
          <img src={post.previewUrl} alt={post.caption.substring(0, 50)} className="max-h-full max-w-full object-contain" />
        )}
        {post.type === 'video' && post.previewUrl && (
          <video src={post.previewUrl} autoPlay loop muted playsInline className="max-h-full max-w-full" />
        )}
      </div>
      
      {/* Action Bar */}
      <div className="p-3 flex items-center gap-4">
        <button
          onClick={() => onToggleLike(post.id)}
          className={`transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-95 ${
            post.liked ? 'text-red-500' : 'text-gray-300 hover:text-white'
          }`}
          aria-label={post.liked ? 'いいねを取り消す' : 'いいね'}
        >
          <HeartIcon isLiked={post.liked} className="w-7 h-7" />
        </button>
        {/* Placeholder for other icons like comment, share */}
      </div>

      {/* Card Content */}
      <div className="px-4 pb-4 space-y-3">
        {post.productLink && (
            <a
             href={post.productLink}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white text-sm font-semibold rounded-md hover:bg-gray-600 transition-colors"
           >
             <LinkIcon className="w-4 h-4" />
             <span>商品リンクを見る</span>
           </a>
        )}
        {post.caption && (
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{post.caption}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;