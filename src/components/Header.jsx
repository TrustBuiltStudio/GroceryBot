import React from 'react'
import { Moon, Sun, Settings, ShoppingCart, Users } from 'lucide-react';


const Header = ({ darkMode, setDarkMode, currentView, setCurrentView, isAdminAuthenticated, setShowAdminLogin, activeUsers }) => {

  return (
     <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-md bg-opacity-95`}>
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-green-600">🥕 VeggieFresh</h1>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <Users className="w-3 h-3" />
              <span>{activeUsers} online</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('user')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1 text-sm ${
                  currentView === 'user' 
                    ? 'bg-green-600 text-white' 
                    : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Order</span>
              </button>
              <button
                onClick={() => {
                  if (isAdminAuthenticated) {
                    setCurrentView('admin');
                  } else {
                    setShowAdminLogin(true);
                  }
                }}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1 text-sm ${
                  currentView === 'admin' 
                    ? 'bg-green-600 text-white' 
                    : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Header