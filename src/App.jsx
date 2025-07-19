import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';
import VegetableManager from './components/VegetableManager';
import AdminLoginModel from './components/AdminLoginModel';
import Chatbot from './components/Chatbot';

const App = () => {
  const [currentView, setCurrentView] = useState('user');
  const [userView, setUserView] = useState('chat');
  const [chatStep, setChatStep] = useState('greeting');
  const [darkMode, setDarkMode] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentOrder, setCurrentOrder] = useState({ vegetables: '', address: '', timestamp: null });
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ phone: '', password: '' });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [vegetables, setVegetables] = useState([
    { id: 1, name: 'Tomatoes', price: 40, available: true },
    { id: 2, name: 'Carrots', price: 35, available: true },
    { id: 3, name: 'Spinach', price: 25, available: true },
    { id: 4, name: 'Potatoes', price: 30, available: true },
    { id: 5, name: 'Bell Peppers', price: 80, available: true },
    { id: 6, name: 'Onions', price: 45, available: true },
    { id: 7, name: 'Cauliflower', price: 35, available: true },
  ]);
  const [editingVegetable, setEditingVegetable] = useState(null);
  const [newVegetable, setNewVegetable] = useState({ name: '', price: '', available: true });
  const [showAddForm, setShowAddForm] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 150) + 50);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const ADMIN_PHONE = "7972191115";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(10, Math.min(300, prev + (Math.floor(Math.random() * 10) - 5))));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (chatStep === 'greeting') {
      const availableVeggies = vegetables.filter(v => v.available);
      setChatMessages([{
        type: 'bot',
        content: "🙏 Namaste! Welcome to VeggieFresh! Here are today's fresh vegetables:",
        vegetables: availableVeggies
      }]);
    }
  }, [chatStep, vegetables]);

  const handleUserMessage = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;
    setIsLoading(true);
    setChatMessages(prev => [...prev, { type: 'user', content: userInput }]);

    await new Promise(res => setTimeout(res, 800));

    if (chatStep === 'greeting') {
      setCurrentOrder({ ...currentOrder, vegetables: userInput });
      setChatMessages(prev => [...prev, {
        type: 'bot', content: "Perfect choice! 📍 Please provide your delivery address:"
      }]);
      setChatStep('address');
    } else if (chatStep === 'address') {
      const finalOrder = {
        ...currentOrder,
        address: userInput,
        timestamp: new Date().toISOString(),
        id: Date.now(),
        status: 'pending',
        estimatedDelivery: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString()
      };
      setOrders(prev => [...prev, finalOrder]);
      setUserOrders(prev => [...prev, finalOrder]);
      setTotalOrders(prev => prev + 1);
      setChatMessages(prev => [...prev, {
        type: 'bot',
        content: `🎉 Order confirmed! Order ID: #${finalOrder.id}\n\n📦 Items: ${finalOrder.vegetables}\n🏠 Address: ${finalOrder.address}\n⏰ Estimated delivery: ${finalOrder.estimatedDelivery}\n\n🚚💚 We'll deliver fresh vegetables to your doorstep!`
      }]);
      setChatStep('completed');
    }

    setUserInput('');
    setIsLoading(false);
  }, [userInput, chatStep, currentOrder, isLoading]);

  const resetChat = () => {
    setChatStep('greeting');
    setCurrentOrder({ vegetables: '', address: '', timestamp: null });
    setChatMessages([]);
  };

  const handleAdminLogin = ({phone, password}) => {
    if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setCurrentView('admin');
    } else {
      alert('Invalid credentials! Please try again.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminCredentials({ phone: '', password: '' });
    setCurrentView('user');
  };

  const updateVegetable = (id, updates) => {
    setVegetables(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    setEditingVegetable(null);
  };

  const deleteVegetable = (id) => {
    setVegetables(prev => prev.filter(v => v.id !== id));
  };

  const addVegetable = () => {
    if (newVegetable.name && newVegetable.price) {
      const vegetable = {
        id: Date.now(),
        name: newVegetable.name,
        price: parseFloat(newVegetable.price),
        available: newVegetable.available
      };
      setVegetables(prev => [...prev, vegetable]);
      setNewVegetable({ name: '', price: '', available: true });
      setShowAddForm(false);
    }
  };

  const markAsDelivered = (orderId) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'delivered' } : order));
    setUserOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'delivered' } : order));
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setShowAdminLogin={setShowAdminLogin}
        isAdminAuthenticated={isAdminAuthenticated}
        activeUsers={activeUsers}
      />

      {showAdminLogin && (
        <AdminLoginModel
          adminCredentials={adminCredentials}
          setAdminCredentials={setAdminCredentials}
          handleAdminLogin={handleAdminLogin}
          setShowAdminLogin={setShowAdminLogin}
          darkMode={darkMode}
        />
      )}

      <div className="px-3 py-4 sm:px-4 sm:py-6">
        {currentView === 'user' ? (
          <div className="max-w-2xl mx-auto">
            <div className={`${cardClasses} rounded-lg border shadow-sm mb-4`}>
              <div className="flex">
                <button
                  onClick={() => setUserView('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-l-lg ${userView === 'chat' ? 'bg-green-600 text-white' : ''}`}
                >
                  🛒 Order Now
                </button>
                <button
                  onClick={() => setUserView('history')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-r-lg ${userView === 'history' ? 'bg-green-600 text-white' : ''}`}
                >
                  📜 History
                </button>
              </div>
            </div>

            {userView === 'chat' ? (
              <Chatbot
                darkMode={darkMode}
                vegetables={vegetables}
                chatMessages={chatMessages}
                userInput={userInput}
                setUserInput={setUserInput}
                handleUserMessage={handleUserMessage}
                chatStep={chatStep}
                resetChat={resetChat}
                isLoading={isLoading}
                chatEndRef={chatEndRef}
                setUserView={setUserView}
              />
            ) : (
              <OrderHistory
                userOrders={userOrders}
                darkMode={darkMode}
                setUserView={setUserView}
              />
            )}
          </div>
        ) : (
          isAdminAuthenticated && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <AdminDashboard
                orders={orders}
                markAsDelivered={markAsDelivered}
                darkMode={darkMode}
                totalOrders={totalOrders}
                activeUsers={activeUsers}
                handleAdminLogout={handleAdminLogout}
              />
              <VegetableManager
                vegetables={vegetables || []}
                updateVegetable={updateVegetable}
                deleteVegetable={deleteVegetable}
                darkMode={darkMode}
                editingVegetable={editingVegetable}
                setEditingVegetable={setEditingVegetable}
                newVegetable={newVegetable}
                setNewVegetable={setNewVegetable}
                addVegetable={addVegetable}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;