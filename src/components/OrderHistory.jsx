import React from 'react';

const OrderHistory = ({ userOrders, darkMode }) => {
  return (
    <div className={`rounded border shadow p-2 max-w-md mx-auto ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}>
      <h2 className="text-lg font-semibold mb-3">📦 Order History</h2>
      {userOrders.length === 0 ? (
        <p className="text-sm">No previous orders found.</p>
      ) : (
        <ul className="space-y-1">
          {
          userOrders.map((order, index) => {
            let dateString = "Invalid date";
          if(order.timestamp){
              const dateobj = new Date(order.timestamp);
          dateString = isNaN(dateobj.getTime())? "Invalid date" : dateobj.toLocaleString();
            }
          return(
          <li
            key={index}
            className={`p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            <div className="text-xs">
              <p><strong>🧾 Order:</strong> {order.vegetables}</p>
              <p><strong>📍 Address:</strong> {order.address}</p>
              <p><strong>📅 Date:</strong> {order.timestamp ? new Date(order.timestamp).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}): "Invalid date"}</p>
            </div>
          </li>
          )
})}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;