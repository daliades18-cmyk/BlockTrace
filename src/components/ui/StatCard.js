import React from 'react';
// We only import the icons we know are defined and we use
import { Search, AlertCircle, Users } from '../common/Icon'; 

const iconMap = {
    // We only list the imported icons here
    Search, 
    AlertCircle, 
    Users, 
    // Any other icon name used in Dashboard will now fall back to AlertCircle
};

const StatCard = ({ title, value, icon, color }) => {
    // If the icon prop is 'ClipboardList', it won't be in iconMap, so it defaults to AlertCircle
    const IconComponent = iconMap[icon] || AlertCircle; 

    return (
        <div className={`p-5 rounded-xl flex items-center shadow-lg ${color} bg-opacity-20 backdrop-blur-sm border border-white/10`}>
            <div className={`p-3 rounded-full ${color} bg-opacity-80 mr-4 shadow-xl`}>
                <IconComponent size={24} className="text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-white/70">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;