import React, { useState, useRef } from 'react';
import { PostData, User } from '../types';
import Preview from './Preview';
import { UploadIcon } from './icons/UploadIcon';
import { LinkIcon } from './icons/LinkIcon';

interface PostCreatorProps {
  onPostCreated: (post: Omit<PostData, 'author'>) => void;
  currentUser: User;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onPostCreated, currentUser }) => {
  const [post, setPost] = useState<Omit<PostData, 'author'>>({
    file: null,
    previewUrl: null,
    caption: '',
    type: null,
    productLink: '',
  });
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split('/')[0];

      if (fileType === 'image' || fileType === 'video') {
        const previewUrl = URL.createObjectURL(file);
        setPost({ ...post, file, previewUrl, type: fileType });
        setError(null);
      } else {
        setError('画像または動画ファイルを選択してください。');
      }
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();
  
  const resetPost = () => {
    if(post.previewUrl) {
      URL.revokeObjectURL(post.previewUrl);
    }
    setPost({
      file: null,
      previewUrl: null,
      caption: '',
      type: null,
      productLink: '',
    });
    setError(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, caption: e.target.value });
  };
  
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, productLink: e.target.value });
  };

  const handlePost = () => {
    if (post.file) {
      onPostCreated(post);
    }
  };

  if (post.previewUrl) {
    return (
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        <Preview post={post} currentUser={currentUser} />
        <div className="p-4 space-y-4">
          <div className="relative">
            <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="url"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-400 pl-10 pr-3 py-2.5"
              placeholder="商品のアフィリエイトリンク..."
              value={post.productLink}
              onChange={handleLinkChange}
            />
          </div>
          <textarea
            className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-400"
            placeholder="キャプション、ハッシュタグを追加..."
            value={post.caption}
            onChange={handleCaptionChange}
          />
          <button
            onClick={handlePost}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            投稿を作成
          </button>
          <button
            onClick={resetPost}
            className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            別のファイルをアップロード
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-in flex items-center justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,video/*"
      />
      <div
        onClick={triggerFileSelect}
        className="w-full h-80 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-gray-700 hover:border-purple-500 transition-all duration-300"
      >
        <UploadIcon className="w-16 h-16 text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">
          クリックしてアップロード
        </h2>
        <p className="text-gray-400 mt-1">
          またはファイルをここにドラッグ＆ドロップ
        </p>
        <p className="text-xs text-gray-500 mt-4">
          画像 (JPG, PNG) または 動画 (MP4)
        </p>
      </div>
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
    </div>
  );
};

export default PostCreator;