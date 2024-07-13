import React, { useState, useEffect } from 'react';

const TabComponent = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'list', label: 'List View' },
    { id: 'thumbnail', label: 'Thumbnail View' }
  ];

  return (
    <span className="flex justify-center rounded-md shadow-sm m-4 p-4">
      {tabs.map(tab => (
        <button
          type="button"
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''} relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </span>
  );
};

export default TabComponent;
