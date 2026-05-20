import React from 'react';
import IssueList from '../ui/IssueList';
import { getStatusColor } from '../../utils/helpers';

const MyContributionsPage = ({ currentUser, issues, onSelectIssue, getUserById }) => {
    
    // Filter issues reported by the current user
    const myReportedIssues = issues.filter(i => i.reportedBy === currentUser.id);
    
    // Filter issues assigned to the current user (if they are a Developer/Tester)
    const myAssignedIssues = issues.filter(i => i.assignedTo === currentUser.id && (i.status !== 'Closed'));

    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-bold text-white border-b border-white/10 pb-4">My Contributions</h1>

            {/* Reported Issues Section */}
            <div>
                <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Issues I Reported ({myReportedIssues.length})</h2>
                <IssueList
                    issues={myReportedIssues}
                    onSelectIssue={onSelectIssue}
                    currentUser={currentUser}
                    getUserById={getUserById}
                    handleUpdateIssueStatus={() => {}} // No status update allowed on this list
                />
            </div>

            {/* Assigned Issues Section (Only visible for Developers/Testers) */}
            {currentUser.role !== 'Community Member' && (
                <div>
                    <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Issues Assigned to Me ({myAssignedIssues.length})</h2>
                    {myAssignedIssues.length > 0 ? (
                        <IssueList
                            issues={myAssignedIssues}
                            onSelectIssue={onSelectIssue}
                            currentUser={currentUser}
                            getUserById={getUserById}
                            handleUpdateIssueStatus={() => {}} // Status update should happen in the detail modal
                        />
                    ) : (
                        <div className="p-6 text-center text-white/70 bg-slate-800 rounded-xl shadow-lg border border-white/10">
                            No issues currently assigned to you. Keep an eye out for new tasks!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyContributionsPage;