import React from 'react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-secondary p-6 rounded-xl border border-secondary-hover shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className="p-4 bg-primary rounded-lg text-primary-accent text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-secondary-text uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-primary-text mt-1">{value}</h3>
    </div>
  </div>
);

export default StatCard;