// C:\fswd\bb2\src\components\App.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Go UP to 'src/', then DOWN into 'data/'
import { initialUsers, initialIssues } from '../data/mockData'; 
// Stay in 'components/', then DOWN into 'common/'
import { X, LogOut, Menu, Bell, User, MessageSquare, Clock, DollarSign } from './common/Icon';
// Go UP to 'src/', then DOWN into 'utils/'
import { getStatusColor, getPriorityColor } from '../utils/helpers';
// Stay in 'components/', then DOWN into 'ui/'
import Modal from './ui/Modal'; 
// Stay in 'components/', then DOWN into 'pages/' (The path causing the error)
import Dashboard from './pages/Dashboard'; 
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import MyContributionsPage from './pages/MyContributionsPage';
import FeaturesPage from './pages/FeaturesPage';

// ... rest of the App.js code ...

// ... rest of the App.js code ...


const BlockTrace = () => {
    const [currentView, setCurrentView] = useState('login'); // Start at 'login'
    const [currentUser, setCurrentUser] = useState(null);
    const [issues, setIssues] = useState(initialIssues);
    const [users, setUsers] = useState(initialUsers);
    const [filteredIssues, setFilteredIssues] = useState(initialIssues);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Form state for creating a new issue
    const [newIssue, setNewIssue] = useState({
        title: '',
        description: '',
        type: 'Bug',
        priority: 'Medium',
        bounty: 5
    });

    // Login/Signup state
    const [loginEmail, setLoginEmail] = useState('bhavana@gmail.com');
    const [loginPassword, setLoginPassword] = useState('password'); 
    const [signupData, setSignupData] = useState({
        name: '', email: '', password: '', role: 'Developer'
    });

    const getUserById = useCallback((id) => users.find(u => u.id === id), [users]);

    // --- Handlers ---
    const handleLogin = (e) => {
        e.preventDefault();
        // Check 1: User exists
        // Check 2: Password must match the hardcoded string 'password'
        const user = users.find(u => u.email === loginEmail && u.password === 'password'); // <-- THIS LINE
        if (user) {
            setCurrentUser(user);
            setCurrentView('home');
        } else {
            alert('Invalid credentials (password is "password" for all)');
        }
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentView('login');
        setSidebarOpen(false);
    };

    const handleCreateIssue = (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const newId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
        const issue = {
            ...newIssue,
            id: newId,
            reportedBy: currentUser.id,
            assignedTo: null,
            status: 'Pending',
            createdAt: new Date(),
            updatedAt: new Date(),
            votes: 0,
            votedBy: [],
            comments: []
        };
        setIssues(prev => [issue, ...prev]);
        setShowReportModal(false);
        setNewIssue({ title: '', description: '', type: 'Bug', priority: 'Medium', bounty: 5 });
        setCurrentView(newIssue.type === 'Bug' ? 'dashboard' : 'features');
    };

    const handleVote = (issueId) => {
        if (!currentUser) return;
        setIssues(prevIssues => prevIssues.map(issue => {
            if (issue.id === issueId) {
                const isVoted = issue.votedBy.includes(currentUser.id);
                return {
                    ...issue,
                    votes: isVoted ? issue.votes - 1 : issue.votes + 1,
                    votedBy: isVoted ? issue.votedBy.filter(id => id !== currentUser.id) : [...issue.votedBy, currentUser.id]
                };
            }
            return issue;
        }));
    };

    const handleUpdateIssueStatus = (issueId, newStatus) => {
        setIssues(prevIssues => prevIssues.map(issue => 
            issue.id === issueId ? { ...issue, status: newStatus, updatedAt: new Date() } : issue
        ));
    };

    // --- Filtering Logic ---
    useEffect(() => {
        let filtered = issues;

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(i => 
                i.title.toLowerCase().includes(lowerSearch) || 
                i.description.toLowerCase().includes(lowerSearch)
            );
        }

        if (filterStatus !== 'All') {
            filtered = filtered.filter(i => i.status === filterStatus);
        }

        if (filterPriority !== 'All') {
            filtered = filtered.filter(i => i.priority === filterPriority);
        }

        setFilteredIssues(filtered);
    }, [searchTerm, filterStatus, filterPriority, issues]);


    // --- Aggregate Stats ---
    const stats = useMemo(() => {
        return {
          total: issues.length,
          open: issues.filter(i => i.status === 'Open' || i.status === 'Pending').length,
          closed: issues.filter(i => i.status === 'Closed').length,
          openBugs: issues.filter(i => i.type === 'Bug' && (i.status === 'Open' || i.status === 'In Progress')).length,
          resolvedBugs: issues.filter(i => i.type === 'Bug' && i.status === 'Closed').length,
          totalBounties: issues.reduce((sum, i) => sum + (i.bounty || 0), 0),
          contributors: new Set(issues.map(i => i.reportedBy).concat(issues.map(i => i.assignedTo).filter(Boolean))).size,
        };
    }, [issues]);


    // --- Render Content Logic ---
    const renderContent = () => {
        if (!currentUser) return null; // Content is hidden if not logged in

        switch (currentView) {
            case 'home':
                return <HomePage stats={stats} setCurrentView={setCurrentView} />;
            case 'dashboard':
                return <Dashboard 
                            stats={stats} 
                            searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                            filterStatus={filterStatus} setFilterStatus={setFilterStatus} 
                            filterPriority={filterPriority} setFilterPriority={setFilterPriority}
                            filteredIssues={filteredIssues.filter(i => i.type === 'Bug')}
                            onSelectIssue={setSelectedIssue}
                            currentUser={currentUser}
                            getUserById={getUserById}
                            handleUpdateIssueStatus={handleUpdateIssueStatus}
                            handleVote={handleVote}
                            setShowReportModal={setShowReportModal}
                        />;
            case 'features':
                return <FeaturesPage 
                            filteredIssues={filteredIssues.filter(i => i.type === 'Feature').sort((a, b) => b.votes - a.votes)}
                            onSelectIssue={setSelectedIssue}
                            currentUser={currentUser}
                            getUserById={getUserById}
                            handleVote={handleVote}
                            setShowReportModal={setShowReportModal}
                        />;
            case 'community':
                return <CommunityPage users={users} issues={issues} />;
            case 'contributions':
                return <MyContributionsPage currentUser={currentUser} issues={issues} onSelectIssue={setSelectedIssue} getUserById={getUserById} />;
            default:
                return <HomePage stats={stats} setCurrentView={setCurrentView} />;
        }
    };


    // --- Render Views (Login, Signup) ---
    const renderAuthView = (isLogin) => (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl border border-indigo-700/50">
                <h1 className="text-3xl font-bold text-center text-white mb-6">{isLogin ? 'Welcome Back' : 'Join BlockTrace'}</h1>
                <p className="text-center text-indigo-400 mb-8">The open-source, blockchain-powered issue tracker.</p>
                
                <form onSubmit={isLogin ? handleLogin : () => alert('Signup not implemented yet')} className="space-y-4">
                    {!isLogin && (
                         <input
                            type="text"
                            placeholder="Full Name"
                            value={signupData.name}
                            onChange={(e) => setSignupData(p => ({ ...p, name: e.target.value }))}
                            className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={isLogin ? loginEmail : signupData.email}
                        onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setSignupData(p => ({ ...p, email: e.target.value }))}
                        className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={isLogin ? loginPassword : signupData.password}
                        onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setSignupData(p => ({ ...p, password: e.target.value }))}
                        className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                     {!isLogin && (
                        <select
                            value={signupData.role}
                            onChange={(e) => setSignupData(p => ({ ...p, role: e.target.value }))}
                            className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Community Member">Community Member</option>
                        </select>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg mt-6"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => setCurrentView(isLogin ? 'signup' : 'login')}
                        className="text-indigo-400 hover:text-indigo-300 ml-2 font-medium"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );


    // --- Main App Render ---
    if (!currentUser) {
        return currentView === 'login' ? renderAuthView(true) : renderAuthView(false);
    }

    const navItems = [
        { name: 'Home', view: 'home' },
        { name: 'Bugs Dashboard', view: 'dashboard' },
        { name: 'Feature Suggestions', view: 'features' },
        { name: 'My Contributions', view: 'contributions' },
        { name: 'Community', view: 'community' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-extrabold text-white tracking-widest cursor-pointer" onClick={() => setCurrentView('home')}>
                            BLOCKTRACE
                        </h1>
                    </div>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex space-x-6">
                        {navItems.map(item => (
                            <a 
                                key={item.name} 
                                onClick={() => setCurrentView(item.view)}
                                className={`text-white text-sm font-medium cursor-pointer transition-colors ${currentView === item.view ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-indigo-300'}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* User and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <Bell size={20} className="text-white/70 hover:text-white cursor-pointer transition-colors" />
                        <div className="hidden sm:flex items-center space-x-3 bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition-colors">
                            <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                                {currentUser.avatar}
                            </span>
                            <span className="text-white text-sm font-medium hidden md:inline">{currentUser.name}</span>
                            <LogOut size={20} className="text-white/70 mr-1" onClick={handleLogout} />
                        </div>
                        <button className="lg:hidden text-white p-2" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar (Modal) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
                    <div className="fixed top-0 right-0 h-full w-64 bg-slate-900 shadow-2xl p-6 transform transition-transform duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-white">BLOCKTRACE</h2>
                            <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navItems.map(item => (
                                <a 
                                    key={item.name} 
                                    onClick={() => { setCurrentView(item.view); setSidebarOpen(false); }}
                                    className={`text-lg font-medium py-2 rounded-lg transition-colors ${currentView === item.view ? 'text-indigo-400' : 'text-white/80 hover:text-indigo-300'}`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                        <button 
                            onClick={handleLogout}
                            className="mt-8 w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                            <LogOut size={20} className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-6 py-8">
                {renderContent()}
            </main>

            {/* Report/Suggest Modal */}
            {showReportModal && (
                <Modal onClose={() => setShowReportModal(false)} title="Report an Issue or Suggest a Feature">
                    <form onSubmit={handleCreateIssue} className="space-y-4 text-white">
                        <select
                            value={newIssue.type}
                            onChange={(e) => setNewIssue(p => ({ ...p, type: e.target.value }))}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="Bug">Bug Report</option>
                            <option value="Feature">Feature Suggestion</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Title (e.g., 'Login button fails on mobile')"
                            value={newIssue.title}
                            onChange={(e) => setNewIssue(p => ({ ...p, title: e.target.value }))}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        <textarea
                            placeholder="Detailed Description"
                            value={newIssue.description}
                            onChange={(e) => setNewIssue(p => ({ ...p, description: e.target.value }))}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-32"
                            required
                        />
                        <div className="flex space-x-4">
                            <select
                                value={newIssue.priority}
                                onChange={(e) => setNewIssue(p => ({ ...p, priority: e.target.value }))}
                                className="w-1/2 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Low">Low Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="High">High Priority</option>
                                <option value="Critical">Critical Priority</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Bounty (BTK)"
                                value={newIssue.bounty}
                                onChange={(e) => setNewIssue(p => ({ ...p, bounty: parseInt(e.target.value) || 0 }))}
                                className="w-1/2 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                min="0"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg"
                        >
                            Submit {newIssue.type}
                        </button>
                    </form>
                </Modal>
            )}


            {/* Bug Detail Modal */}
            {selectedIssue && (
                <Modal onClose={() => setSelectedIssue(null)} large title={selectedIssue.title}>
                    <div className="text-white space-y-6">
                        {/* Status, Priority, Bounty */}
                        <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedIssue.status)} text-white`}>
                                {selectedIssue.status}
                            </span>
                            <span className={`text-sm font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                                Priority: {selectedIssue.priority}
                            </span>
                            {selectedIssue.bounty > 0 && (
                                <span className="flex items-center text-green-400 text-sm font-medium">
                                    <DollarSign size={16} className="mr-1" /> {selectedIssue.bounty} BTK Bounty
                                </span>
                            )}
                            <span className="flex items-center text-white/70 text-sm font-medium">
                                <Clock size={16} className="mr-1" /> Reported: {selectedIssue.createdAt.toLocaleDateString()}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-300">Description</h3>
                            <p className="text-white/80 whitespace-pre-wrap">{selectedIssue.description}</p>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                            <div>Reported By: <span className="text-white font-medium">{getUserById(selectedIssue.reportedBy)?.name}</span></div>
                            <div>Assigned To: <span className="text-white font-medium">{getUserById(selectedIssue.assignedTo)?.name || 'Unassigned'}</span></div>
                        </div>

                        {/* Comments Section (Simplified) */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-300 flex items-center">
                                <MessageSquare size={20} className="mr-2" /> Comments ({selectedIssue.comments.length})
                            </h3>
                            <div className="bg-slate-800 p-4 rounded-lg space-y-3 max-h-64 overflow-y-auto border border-white/10">
                                {selectedIssue.comments.length === 0 ? (
                                    <p className="text-white/50 italic">No comments yet. Be the first!</p>
                                ) : (
                                    selectedIssue.comments.map(comment => (
                                        <div key={comment.id} className="border-b border-slate-700 pb-2 last:border-b-0">
                                            <div className="text-sm font-medium text-indigo-400 flex justify-between">
                                                <span>{getUserById(comment.userId)?.name}</span>
                                                <span className="text-xs text-white/50">{comment.timestamp.toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-white/80 text-sm mt-1">{comment.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <button
                                onClick={() => handleVote(selectedIssue.id)}
                                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                                    selectedIssue.votedBy.includes(currentUser?.id) 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                        : 'bg-white/10 hover:bg-white/20 text-white/80'
                                }`}
                            >
                                <ThumbsUp size={18} className="mr-2" />
                                {selectedIssue.votes} Votes
                            </button>
                            <button
                                onClick={() => handleUpdateIssueStatus(selectedIssue.id, 'Closed')}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Mark as Closed
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BlockTrace;