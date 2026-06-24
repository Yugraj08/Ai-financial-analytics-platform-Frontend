import { motion } from 'framer-motion';
import { User } from 'lucide-react';

/**
 * Chat message bubble component.
 * Renders differently for user vs AI messages:
 * - User: right-aligned, accent gradient background
 * - AI: left-aligned, glass-card with bot avatar
 *
 * Supports basic text formatting in AI responses:
 * - **bold** text
 * - Line breaks
 * - Bullet points (- or •)
 * - Numbered lists (1. 2. 3.)
 */
const ChatMessage = ({ message, isUser, timestamp }) => {

  /**
   * Formats AI response text with basic styling.
   * Converts markdown-like patterns to styled spans.
   */
  const formatAiText = (text) => {
    if (!text) return '';

    // Split into lines for processing
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      // Handle bullet points
      const isBullet = /^\s*[-•]\s/.test(line);
      const isNumbered = /^\s*\d+[.)]\s/.test(line);

      // Process inline bold (**text** or __text__)
      const parts = line.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
      const formattedParts = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={partIndex} className="font-semibold text-text-primary">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return (
            <span key={partIndex} className="font-semibold text-text-primary">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      });

      // Determine line styling
      let className = '';
      if (isBullet || isNumbered) {
        className = 'pl-4';
      }

      return (
        <span key={lineIndex} className={className}>
          {formattedParts}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  /**
   * Formats the timestamp for display.
   */
  const formatTime = (ts) => {
    if (!ts) return '';
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return ts;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} max-w-[85%] ${
        isUser ? 'ml-auto' : 'mr-auto'
      }`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4 text-accent" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
          <svg
            className="w-4 h-4 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
      )}

      {/* Message bubble */}
      <div className="space-y-1.5">
        <div
          className={`px-4 py-3 rounded-2xl text-body-sm leading-relaxed ${
            isUser
              ? 'bg-accent text-white rounded-tr-md shadow-lg shadow-accent/20'
              : 'glass-card rounded-tl-md text-text-primary'
          }`}
        >
          {isUser ? message : formatAiText(message)}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <p
            className={`text-caption text-text-muted px-1 ${
              isUser ? 'text-right' : 'text-left'
            }`}
          >
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
