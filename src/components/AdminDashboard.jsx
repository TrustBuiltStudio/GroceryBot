import React from 'react';
import VegetableManager from './VegetableManager';

const AdminDashboard = ({ orders, vegetables,
  setVegetables,
  markAsDelivered,
  darkMode,
  totalOrders,
  activeUsers,
  handleAdminLogout}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`rounded-lg border shadow-lg p-4 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}>
        <h2 className="text-xl font-semibold mb-3">📦 All Orders</h2>
        <div className="mb-2 flex justify-between items-center text-sm">
          <span>Total Orders: <strong>{totalOrders}</strong></span>
          <span>Active Users: <strong>{activeUsers}</strong></span>
          <button onClick={handleAdminLogout} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Logout</button>
        </div>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              >
                <div className="text-sm">
                  <p><strong>👤 User:</strong> {order.user || 'N/A'}</p>
                  <p><strong>🧾 Order:</strong> {order.vegetables}</p>
                  <p><strong>📍 Address:</strong> {order.address}</p>
                  <p><strong>📱 Mobile:</strong> {order.mobile || 'N/A'}</p>
                  <p><strong>📅 Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                  {
                    order.status !== 'delivered' && (
                        <button onClick={() => markAsDelivered(order.id)}
                        className='mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs'
                        >Mark as Delivered</button>
                    )
                  }
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <VegetableManager vegetables={vegetables} setVegetables={setVegetables} darkMode={darkMode} />
    </div>
  );
};

export default AdminDashboard;