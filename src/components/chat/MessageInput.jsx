import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Chat message input with send button.
 * - Submit on Enter (Shift+Enter for newline)
 * - Auto-resizing textarea
 * - Disabled during loading
 * - Auto-focus on mount
 */
const MessageInput = ({ onSend, isLoading, placeholder }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setMessage('');

    // Reset textarea height after clearing
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="glass-card p-3 flex items-end gap-3">
      {/* Textarea input */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Ask about your finances...'}
        disabled={isLoading}
        rows={1}
        className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted
                   text-body-sm resize-none focus:outline-none py-2 px-1
                   disabled:opacity-50 disabled:cursor-not-allowed
                   max-h-[120px] no-scrollbar"
      />

      {/* Send button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        disabled={!message.trim() || isLoading}
        className="p-2.5 rounded-xl bg-accent text-white shadow-lg shadow-accent/20
                   hover:bg-accent-hover transition-colors duration-200
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                   flex-shrink-0"
        title="Send message"
      >
        <Send className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default MessageInput;
