import React from 'react';
import Button from '../ui/Button';

const QuestionEditor = ({ question, index, updateQuestion, removeQuestion }) => {
  const isChoiceBased = question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';

  const handleChange = (field, value) => {
    updateQuestion(question.id, { [field]: value });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
    handleChange('options', newOptions);
  };

  const updateOption = (optIndex, newValue) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = newValue;
    handleChange('options', newOptions);
  };

  const removeOption = (optIndex) => {
    const newOptions = question.options.filter((_, i) => i !== optIndex);
    handleChange('options', newOptions);
  };

  return (
    <div className="bg-secondary p-6 rounded-lg border border-secondary-hover shadow-sm mb-6 transition-all">
      <div className="flex flex-col-reverse justify-between items-start mb-4 gap-4">
        <div className="w-full">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={question.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            required
          />
        </div>
        <div className="w-48 ml-auto">
          <select
            value={question.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <option className="text-sm" value="TEXT">Short Answer (Text)</option>
            <option className="text-sm" value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option className="text-sm" value="CHECKBOX">Checkboxes</option>
          </select>
        </div>
      </div>

      {/* Dynamic Options Section */}
      {isChoiceBased && (
        <div className="ml-4 pl-4 border-l-2 border-secondary-hover space-y-3 mb-4">
          {(question.options || []).map((option, optIndex) => (
            <div key={optIndex} className="flex items-center gap-2">
              {question.type === 'CHECKBOX' ? (
                <div className="w-4 h-4 border border-secondary-text rounded-sm"></div>
              ) : (
                <div className="w-4 h-4 border border-secondary-text rounded-full"></div>
              )}
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(optIndex, e.target.value)}
                className="flex-1 bg-transparent text-primary-text border-b border-secondary-hover focus:border-primary-accent focus:outline-none px-2 py-1 text-sm"
                placeholder={`Option ${optIndex + 1}`}
                required
              />
              <button 
                type="button"
                onClick={() => removeOption(optIndex)}
                className="text-secondary-text hover:text-red-400 p-1"
                title="Remove Option"
              >
                ✕
              </button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addOption} className="text-xs mt-2">
            + Add Option
          </Button>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-secondary-hover mt-4">
        <label className="flex items-center gap-2 text-sm text-secondary-text cursor-pointer">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="rounded border-secondary-text text-primary-accent focus:ring-primary-accent bg-primary"
          />
          Required Question
        </label>
        
        <Button type="button" variant="danger" onClick={() => removeQuestion(question.id)}>
          Delete Question
        </Button>
      </div>
    </div>
  );
};

export default QuestionEditor;