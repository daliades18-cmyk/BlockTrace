import React from 'react';
import IssueList from '../ui/IssueList';
import { Plus } from '../common/Icon';
// You might need to add handleVote if you implement voting on features

const FeaturesPage = ({ filteredIssues, onSelectIssue, currentUser, getUserById, setShowReportModal }) => {
    const featureIssues = filteredIssues.filter(i => i.type === 'Feature');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h1 className="text-3xl font-bold text-white">Feature Suggestions ({featureIssues.length})</h1>
                <button
                    onClick={() => setShowReportModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg flex items-center transition-colors"
                >
                    <Plus size={20} className="mr-2" /> Suggest New Feature
                </button>
            </div>

            {/* Note: IssueList is being reused here for features */}
            <IssueList
                issues={featureIssues}
                onSelectIssue={onSelectIssue}
                currentUser={currentUser}
                getUserById={getUserById}
                // No status update handler needed for features here
                handleUpdateIssueStatus={() => {}} 
            />
        </div>
    );
};

export default FeaturesPage;