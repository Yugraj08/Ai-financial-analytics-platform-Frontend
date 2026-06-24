import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Trash2 } from 'lucide-react';
import ChatMessage from '../components/chat/ChatMessage';
import MessageInput from '../components/chat/MessageInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { sendMessage } from '../services/aiService';
import { pageTransition } from '../animations/variants';

/**
 * Suggested starter questions shown when conversation is empty.
 * Designed to showcase the AI's financial analysis capabilities.
 */
const SUGGESTED_QUESTIONS = [
  { text: 'How much did I spend this month?', emoji: '💸' },
  { text: 'What is my largest expense category?', emoji: '📊' },
  { text: 'Compare my income vs expenses', emoji: '⚖️' },
  { text: 'Can I save more money?', emoji: '🐷' },
  { text: 'What are my recurring expenses?', emoji: '🔄' },
  { text: 'Show my spending trends', emoji: '📈' },
  { text: 'Which categories should I reduce?', emoji: '✂️' },
  { text: 'What is affecting my balance?', emoji: '🎯' },
];

const AssistantPage = () => {
  const { user } = useAuth();

  // Chat state — messages stored in session (cleared on page leave)
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive or loading state changes.
   */
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /**
   * Send a message to the AI assistant.
   * Adds the user message immediately, then waits for the AI response.
   */
  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    // Add user message to chat immediately
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(text.trim());

      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI chat error:', err);

      // Determine error message based on error type
      let errorText;
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        errorText =
          'Cannot reach the server. It may be starting up — please wait 30 seconds and try again.';
      } else if (err.code === 'ECONNABORTED') {
        errorText =
          'The request timed out. The AI may be processing a complex query — please try again.';
      } else if (err.response?.status === 403) {
        errorText = 'Access denied. Please make sure you are logged in.';
      } else {
        errorText =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Sorry, something went wrong. Please try again.';
      }

      setError(errorText);

      // Also add error as an AI message so it appears in chat
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        isUser: false,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear the entire conversation.
   */
  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  /**
   * Retry the last failed message.
   */
  const handleRetry = () => {
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.isUser);
    if (lastUserMsg) {
      // Remove error messages after the last user message
      setMessages((prev) => {
        const lastUserIndex = prev.findLastIndex((m) => m.isUser);
        return prev.slice(0, lastUserIndex + 1);
      });
      setError(null);
      // Re-send (remove the user message first, handleSend will re-add it)
      setMessages((prev) => prev.slice(0, -1));
      handleSend(lastUserMsg.text);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-[calc(100vh-4rem)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-heading-4 text-text-primary font-bold">
              FinanceIQ <span className="text-accent">Copilot</span>
            </h1>
            <p className="text-caption text-text-muted">
              AI-powered financial insights
            </p>
          </div>
        </div>

        {hasMessages && (
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6 space-y-6 no-scrollbar"
      >
        {!hasMessages ? (
          /* ===== Empty State / Welcome ===== */
          <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto space-y-8">
            {/* AI Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-2xl shadow-accent/30"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-heading-2 text-text-primary font-bold">
                Hi{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
              </h2>
              <p className="text-body text-text-secondary max-w-md mx-auto leading-relaxed">
                I'm your AI finance copilot. Ask me anything about your
                spending, income, savings, and financial habits.
              </p>
            </motion.div>

            {/* Suggested questions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <p className="text-caption text-text-muted uppercase tracking-wider font-semibold mb-4">
                Try asking
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    onClick={() => handleSend(q.text)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                               glass-card text-left text-body-sm text-text-secondary
                               hover:text-text-primary hover:border-accent/30
                               transition-all duration-200 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {q.emoji}
                    </span>
                    <span>{q.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* ===== Message List ===== */
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            {/* Error retry button */}
            {error && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleRetry}
                >
                  Retry
                </Button>
              </motion.div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area — fixed at bottom */}
      <div className="px-4 md:px-6 lg:px-8 pb-4 pt-2">
        <MessageInput
          onSend={handleSend}
          isLoading={isLoading}
          placeholder={
            hasMessages
              ? 'Ask a follow-up question...'
              : 'Ask about your finances...'
          }
        />
        <p className="text-center text-caption text-text-muted mt-2">
          FinanceIQ Copilot uses your financial data to provide personalized insights.
        </p>
      </div>
    </motion.div>
  );
};

export default AssistantPage;
