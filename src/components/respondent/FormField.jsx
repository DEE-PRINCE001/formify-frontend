import React from 'react';

const FormField = ({ question, value, onChange }) => {
  const { text, type, required, options } = question;

  // Handle Checkbox Toggles locally, passing the updated array up to the container
  const handleCheckboxChange = (option) => {
    const currentSelections = Array.isArray(value) ? value : [];
    if (currentSelections.includes(option)) {
      onChange(currentSelections.filter(item => item !== option));
    } else {
      onChange([...currentSelections, option]);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-lg border border-secondary-hover shadow-sm transition-all">
      <label className="block text-lg font-medium text-primary-text mb-3">
        {text}
        {required && <span className="text-red-400 ml-1" title="Required">*</span>}
      </label>

      {/* TEXT TYPE */}
      {type === 'TEXT' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your answer"
          className="w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all text-sm"
          required={required}
        />
      )}

      {/* MULTIPLE CHOICE TYPE */}
      {type === 'MULTIPLE_CHOICE' && (
        <div className="space-y-2">
          {options?.map((option, idx) => (
            <label key={idx} className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/50 cursor-pointer transition-colors text-primary-text text-sm">
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={value === option}
                onChange={() => onChange(option)}
                className="w-4 h-4 border-secondary-hover text-primary-accent focus:ring-primary-accent bg-primary"
                required={required}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* CHECKBOX TYPE */}
      {type === 'CHECKBOX' && (
        <div className="space-y-2">
          {options?.map((option, idx) => {
            const isChecked = Array.isArray(value) && value.includes(option);
            return (
              <label key={idx} className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/50 cursor-pointer transition-colors text-primary-text text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-4 h-4 rounded border-secondary-hover text-primary-accent focus:ring-primary-accent bg-primary"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormField;