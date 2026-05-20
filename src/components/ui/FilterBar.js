import React from 'react';
import { Search } from '../common/Icon';

const FilterBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterPriority, setFilterPriority }) => {
    const statusOptions = ['All', 'Pending', 'Open', 'In Progress', 'Testing', 'Closed'];
    const priorityOptions = ['All', 'Low', 'Medium', 'High', 'Critical'];

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 bg-slate-800 rounded-xl shadow-lg border border-white/10 text-white">
            
            {/* Search Bar */}
            <div className="relative flex-grow">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                    type="text"
                    placeholder="Search issues by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-white/50"
                />
            </div>

            {/* Status Filter */}
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-auto"
            >
                <option value="All">Filter by Status (All)</option>
                {statusOptions.filter(s => s !== 'All').map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>

            {/* Priority Filter */}
            <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-auto"
            >
                <option value="All">Filter by Priority (All)</option>
                {priorityOptions.filter(p => p !== 'All').map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;