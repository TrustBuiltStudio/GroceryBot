import React from 'react'
import MessageBubble from './MessageBubble';
import { Send } from 'lucide-react';


const Chatbot = ({  chatMessages,
  userInput,
  setUserInput,
  handleUserMessage,
  chatStep,
  isLoading,
  resetChat,
  darkMode,
  chatEndRef,
  inputClasses,}) => {




  return (
   <div className={`rounded border shadow overflow-hidden mx-auto max-w-md sm:max-w-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="h-64 sm:h-80 overflow-y-auto p-2 sm:p-3 space-y-2">
        {chatMessages.map((message, index) => (
          <MessageBubble key={index} message={message} darkMode={darkMode} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`px-2 py-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-bl-none`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {chatStep !== 'completed' ? (
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3 sm:p-4`}>
          <div className="flex space-x-1">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={chatStep === 'greeting' ? "Type vegetables you want..." : "Enter your delivery address..."}
              className={`flex-1 p-2 border rounded-lg resize-none text-sm ${inputClasses}`}
              rows={2}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUserMessage())}
              disabled={isLoading}
            />
            <button
              onClick={handleUserMessage}
              disabled={isLoading}
              className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-2 sm:p-3 text-center`}>
          <button
            onClick={resetChat}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            🛒 Place Another Order
          </button>
        </div>
      )}
    </div>
  )
}

export default Chatbot