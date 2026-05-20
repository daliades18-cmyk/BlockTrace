import React from 'react';
const HomePage = ({ stats, setCurrentView }) => (
    <div className="text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to BlockTrace</h1>
        <p className="text-xl mb-6 text-indigo-300">A decentralized issue tracker.</p>
        <button onClick={() => setCurrentView('dashboard')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium">View Bugs Dashboard</button>
    </div>
);
export default HomePage;