
import React, { useState, useEffect } from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { CopyIcon } from './icons/CopyIcon';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset copied state when modal is closed
      setTimeout(() => setCopied(false), 300);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL to clipboard:", err);
      // Optionally, show an error message to the user
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl p-6 m-4 w-full max-w-md transform transition-transform duration-300 scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-2">投稿が作成されました！</h2>
        <p className="text-gray-400 text-center mb-6">このURLを共有して投稿を公開できます。</p>
        
        <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-3">
          <LinkIcon className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent text-gray-300 focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {copied ? 'コピー完了!' : 'コピー'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ShareModal;