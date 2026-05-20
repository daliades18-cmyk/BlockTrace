export const getStatusColor = (status) => {
    const colors = {
        'Open': 'bg-blue-500',
        'In Progress': 'bg-yellow-500',
        'Resolved': 'bg-green-500',
        'Closed': 'bg-gray-500',
        'Pending': 'bg-indigo-500',
        'Approved': 'bg-teal-500'
    };
    return colors[status] || 'bg-gray-500';
};

export const getPriorityColor = (priority) => {
    const colors = {
        'Low': 'text-green-400',
        'Medium': 'text-yellow-400',
        'High': 'text-orange-400',
        'Critical': 'text-red-400'
    };
    return colors[priority] || 'text-gray-400';
};