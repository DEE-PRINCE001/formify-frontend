import React from 'react';
import Button from '../ui/Button';

const EmptyState = ({ onAction }) => {
  return (
    <div className="text-center py-16 px-4 bg-secondary border border-dashed border-secondary-text rounded-lg">
      <svg className="mx-auto h-12 w-12 text-secondary-text opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-primary-text">No forms yet</h3>
      <p className="mt-2 text-sm text-secondary-text max-w-sm mx-auto">
        Your workspace is empty. Get started by creating your first form to collect responses.
      </p>
      <div className="mt-8">
        <Button onClick={onAction} variant="primary">
          + Create New Form
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;