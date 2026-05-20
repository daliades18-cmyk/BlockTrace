import React from 'react';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';
import { Clock, User } from '../common/Icon';

const IssueList = ({ issues, onSelectIssue, currentUser, getUserById, handleUpdateIssueStatus }) => {
    if (issues.length === 0) {
        return <div className="p-8 text-center text-white/70 bg-slate-800 rounded-xl shadow-lg border border-white/10">No issues found matching current filters.</div>;
    }

    return (
        <div className="space-y-4">
            {issues.map(issue => (
                <div 
                    key={issue.id} 
                    className="p-5 bg-slate-800 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:bg-slate-700/50 transition-colors cursor-pointer"
                    onClick={() => onSelectIssue(issue)}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white truncate w-3/4">{issue.title}</h3>
                        <div className="flex space-x-2 flex-shrink-0">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)} text-white`}>
                                {issue.status}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority)}`}>
                                {issue.priority}
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-sm text-white/70 mb-3 line-clamp-2">{issue.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-white/50">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                {issue.createdAt.toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                                <User size={14} className="mr-1" />
                                Reported by: {getUserById(issue.reportedBy)?.name}
                            </span>
                        </div>
                        <span className="text-indigo-400 font-medium">{issue.votes} Votes</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IssueList;