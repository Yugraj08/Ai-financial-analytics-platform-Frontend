import API from '../api/axios';

/**
 * AI Assistant API Service
 * Sends user messages to the backend AI endpoint
 * which processes them through NVIDIA NIM with financial context.
 */

/**
 * Send a message to the AI assistant.
 * The backend automatically injects the user's financial data as context.
 *
 * @param {string} message - The user's question
 * @returns {Promise<{response: string, timestamp: string}>}
 */
export const sendMessage = async (message) => {
  const response = await API.post('/api/ai/chat', { message });
  return response.data;
};
