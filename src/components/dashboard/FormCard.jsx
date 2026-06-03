import React from 'react';
import Button from '../ui/Button';

const FormCard = ({ form, onCopyLink, onViewResponses, onDelete }) => {
  return (
    <div className="bg-secondary rounded-lg border border-secondary-hover shadow-lg hover:border-secondary-text transition-colors p-6 flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-primary-text truncate" title={form.title}>
          {form.title}
        </h3>
        <p className="mt-2 text-sm text-secondary-text line-clamp-2">
          {form.description || 'No description provided.'}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-secondary-hover flex flex-wrap gap-2">
        <Button onClick={() => onCopyLink(form.id)} variant="secondary" className="flex-1 text-xs">
          Copy Link
        </Button>
        <Button onClick={() => onViewResponses(form.id)} variant="secondary" className="flex-1 text-xs">
          Responses
        </Button>
        <Button onClick={() => onDelete(form.id)} variant="danger" className="px-3 text-xs">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FormCard;