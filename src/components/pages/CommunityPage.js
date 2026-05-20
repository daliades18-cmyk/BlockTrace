import React from 'react';
import { Users } from '../common/Icon'; // Re-using existing icons

const CommunityPage = ({ users, issues }) => {
    
    // Calculate stats per user
    const userStats = users.map(user => {
        const reported = issues.filter(i => i.reportedBy === user.id).length;
        const assigned = issues.filter(i => i.assignedTo === user.id).length;
        const resolved = issues.filter(i => i.assignedTo === user.id && i.status === 'Closed').length;

        return {
            ...user,
            reportedCount: reported,
            assignedCount: assigned,
            resolvedCount: resolved,
        };
    }).sort((a, b) => b.contributions - a.contributions); // Sort by contributions

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Community & Contributor Ranks ({users.length})</h1>

            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-white/10">
                <h2 className="text-xl font-semibold text-indigo-400 mb-4">Top Contributors</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Bugs Reported</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Assigned/Closed</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Bounty Earned</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {userStats.map(user => (
                                <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold mr-3">{user.avatar}</div>
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">{user.reportedCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">{user.assignedCount} / {user.resolvedCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-400 font-medium">${user.bountyEarned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <section className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Community Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-white/10 text-center">
                        <Users size={32} className="text-indigo-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-white">{users.length}</p>
                        <p className="text-white/70">Total Members</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-white/10 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">${issues.reduce((sum, i) => sum + (i.bounty || 0), 0)}</div>
                        <p className="text-white/70">Total Bounty Value</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CommunityPage;