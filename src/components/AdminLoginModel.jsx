import React, { useState } from 'react';

const AdminLoginModel = ({ setShowAdminLogin, handleAdminLogin, darkMode }) => {
  const [password, setPassword] = useState('');
  const [phone, setphone] = useState('');

  const handleLogin = () => {
   handleAdminLogin({phone, password});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-xl font-bold mb-4">🔐 Admin Login</h2>
        <input
          type="Phone"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
        <button onClick={() => setShowAdminLogin(false)}
        >Cancel</button>
      </div>
    </div>
  );
};

export default AdminLoginModel;
