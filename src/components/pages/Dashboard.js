import React from 'react';
import StatCard from '../ui/StatCard'; // Should be '../ui/StatCard' (Up one level to components/, down to ui/)
import FilterBar from '../ui/FilterBar'; // Assuming you have this file, if not, use placeholder
import IssueList from '../ui/IssueList'; // Assuming you have this file, if not, use placeholder
import { Plus } from '../common/Icon'; // Should be '../common/Icon'
// ... rest of Dashboard.js

const Dashboard = ({ stats, searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterPriority, setFilterPriority, filteredIssues, onSelectIssue, currentUser, getUserById, handleUpdateIssueStatus, handleVote, setShowReportModal }) => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Bugs Dashboard</h1>

            // ...
            {/* Stats Grid - All icons now use AlertCircle or Users for safety */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Changed from icon="ClipboardList" to icon="AlertCircle" */}
                <StatCard title="Total Issues" value={stats.total} icon="AlertCircle" color="bg-indigo-500" /> 
                <StatCard title="Open Bugs" value={stats.openBugs} icon="AlertCircle" color="bg-red-500" />
                <StatCard title="Total Bounties" value={`$${stats.totalBounties}`} icon="AlertCircle" color="bg-green-500" /> 
                <StatCard title="Contributors" value={stats.contributors} icon="Users" color="bg-sky-500" />
            </div>

            {/* Header and Actions */}
            <div className="flex justify-between items-center pt-4">
                <h2 className="text-2xl font-semibold text-white">Active Bugs ({filteredIssues.length})</h2>
                <button
                    onClick={() => setShowReportModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg flex items-center transition-colors"
                >
                    <Plus size={20} className="mr-2" /> Report New Bug
                </button>
            </div>

            {/* Filter and Search */}
            <FilterBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                filterStatus={filterStatus} 
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />

            {/* Issue List */}
            <IssueList
                issues={filteredIssues}
                onSelectIssue={onSelectIssue}
                currentUser={currentUser}
                getUserById={getUserById}
                handleUpdateIssueStatus={handleUpdateIssueStatus}
                handleVote={handleVote}
            />
        </div>
    );
};

export default Dashboard;