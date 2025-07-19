import React, { useState } from 'react';

const VegetableManager = ({ vegetables = [],
    updateVegetable,
    deleteVegetable,
    darkMode,
    editingVegetable,
    setEditingVegetable,
    newVegetable,
    setNewVegetable,
    addVegetable,
    showAddForm,
    setShowAddForm
     }) => {



   

    return (

        <div className={`rounded border shadow p-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}>
            <h2 className="text-lg font-semibold mb-2">🥦 Manage Vegetables</h2>
            <div className="space-y-2">
                {vegetables.map((veg) => (
                    <div key={veg.id} className="flex justify-between items-center border p-1 rounded">
                        <span>{veg.name} - ₹{veg.price}/kg</span>
                        <button onClick={() => deleteVegetable(veg.id)} className="text-red-500 text-xs hover:underline">Remove</button>
                    </div>
                ))}
                {showAddForm ? (
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 mt-1">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newVegetable.name}
                            onChange={(e) => setNewVegetable({ ...newVegetable, name: e.target.value })}
                            className="flex-1 px-2 py-1 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newVegetable.price}
                            onChange={(e) => setNewVegetable({ ...newVegetable, price: e.target.value })}
                            className="flex-1 px-2 py-1 border rounded"
                        />
                        <button onClick={addVegetable} className="bg-green-600 text-white px-2 py-1 rounded">Add</button>
                        <button onClick={() => setShowAddForm(false)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setShowAddForm(true)} className="bg-green-600 text-white px-2 py-1 rounded mt-2">Add Vegetable</button>
                )}
            </div>
        </div>
    );
};

export default VegetableManager;