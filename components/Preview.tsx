import React from 'react';
import { PostData, User } from '../types';
import { LinkIcon } from './icons/LinkIcon';

interface PreviewProps {
  post: Omit<PostData, 'author'>;
  currentUser: User;
}

const Preview: React.FC<PreviewProps> = ({ post, currentUser }) => {
  return (
    <div className="bg-black">
      <div className="flex items-center p-3">
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full border-2 border-gray-600"
        />
        <span className="ml-3 font-semibold">{currentUser.name}</span>
      </div>
      <div className="w-full aspect-square bg-gray-900 flex items-center justify-center">
        {post.type === 'image' && post.previewUrl && (
          <img src={post.previewUrl} alt="Post preview" className="max-h-full max-w-full object-contain" />
        )}
        {post.type === 'video' && post.previewUrl && (
          <video src={post.previewUrl} controls className="max-h-full max-w-full" />
        )}
      </div>
      {post.productLink && (
        <div className="p-3 border-t border-gray-700">
           <a
             href={post.productLink}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white text-sm font-semibold rounded-md hover:bg-gray-600 transition-colors"
           >
             <LinkIcon className="w-4 h-4" />
             <span>商品リンクを見る</span>
           </a>
        </div>
      )}
    </div>
  );
};

export default Preview;