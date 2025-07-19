const MessageBubble = ({ message, darkMode }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-full px-2 py-1 rounded ${message.type === 'user'
          ? 'bg-green-600 text-white rounded-br-none'
          : `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} rounded-bl-none`
        }`}>
        <p className="text-xs leading-relaxed">{message.content}</p>
        {message.vegetables && (
          <div className="mt-2 space-y-1">
            {message.vegetables.map((veg) => (
              <div key={veg.id} className={`text-xs p-2 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{veg.name}</span>
                  <span className="text-green-600 font-bold">₹{veg.price}/kg</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;