import React from 'react';

const ProgressBar = ({ label, count, total, index }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  // Alternate colors slightly based on index for visual distinction
  const barColor = index % 2 === 0 ? 'bg-primary-accent' : 'bg-secondary-accent';

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-primary-text font-medium truncate pr-4">{label}</span>
        <span className="text-secondary-text whitespace-nowrap">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-primary rounded-full h-2.5 overflow-hidden border border-secondary-hover">
        <div 
          className={`h-2.5 rounded-full ${barColor} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;