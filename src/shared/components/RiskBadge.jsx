import React from 'react';

export default function RiskBadge({ level, dataTestId }) {
  const badgeClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const badgeText = {
    high: 'High Risk',
    medium: 'Medium Risk',
    low: 'Low Risk',
  };

  return (
    <span 
      className={`px-2 py-1 text-xs rounded-full ${badgeClasses[level] || 'bg-gray-100 text-gray-800'}`}
      data-testid={dataTestId}
    >
      {badgeText[level] || 'Unknown Risk'}
    </span>
  );
}