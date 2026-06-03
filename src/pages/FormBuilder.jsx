import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import QuestionEditor from '../components/builder/QuestionEditor';
import { formService } from '../api/formService';

const FormBuilder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Overall form state
  const [formDetails, setFormDetails] = useState({ title: '', description: '' });
  
  // Initialize with one default question
  const [questions, setQuestions] = useState([
    { id: crypto.randomUUID(), title: '', type: 'TEXT', required: false, options: [] }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), title: '', type: 'TEXT', required: false, options: [] }
    ]);
  };

  const updateQuestion = (id, updates) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const removeQuestion = (id) => {
    if (questions.length === 1) {
      alert("A form must have at least one question.");
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Payload Cleanup: Match API requirements exactly
    const cleanedQuestions = questions.map(q => {
      const isChoice = q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX';
      return {
        title: q.title,
        type: q.type,
        required: q.required,
        // Only include options if it's a choice type, otherwise API might reject it
        ...(isChoice ? { options: q.options } : {})
      };
    });

    const payload = {
      title: formDetails.title,
      description: formDetails.description,
      questions: cleanedQuestions
    };

    try {
      setLoading(true);
      const newForm = await formService.createForm(payload);
      
      // Success! Alert the user and send them back to the dashboard
      const shareLink = `${window.location.origin}/form/${newForm.id}`;
      navigator.clipboard.writeText(shareLink);
      alert(`Form created successfully!\nThe shareable link has been copied to your clipboard:\n${shareLink}`);
      
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to save the form. Please check your data and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-secondary-text hover:text-primary-text mb-4 inline-flex items-center text-sm transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-primary-text">Create New Form</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 text-red-400 rounded-r-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Header Section */}
          <div className="bg-secondary p-8 rounded-lg border-t-8 border-t-primary-accent shadow-md mb-6">
            <input
              type="text"
              placeholder="Form Title"
              value={formDetails.title}
              onChange={(e) => setFormDetails({ ...formDetails, title: e.target.value })}
              className="w-full bg-transparent text-4xl font-bold text-primary-text placeholder-secondary-text focus:outline-none border-b border-transparent focus:border-primary-accent pb-2 transition-colors mb-4"
              required
            />
            <textarea
              placeholder="Form Description (Optional)"
              value={formDetails.description}
              onChange={(e) => setFormDetails({ ...formDetails, description: e.target.value })}
              className="w-full bg-transparent text-secondary-text placeholder-secondary-text/50 focus:outline-none border-b border-transparent focus:border-secondary-text pb-1 transition-colors resize-none overflow-hidden"
              rows={2}
            />
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((q, index) => (
              <QuestionEditor
                key={q.id} // using crypto.randomUUID() ensures stable keys during re-ordering
                index={index}
                question={q}
                updateQuestion={updateQuestion}
                removeQuestion={removeQuestion}
              />
            ))}
          </div>

          {/* Add Question Button */}
          <div className="flex justify-center mt-6">
            <Button type="button" variant="secondary" onClick={handleAddQuestion} className="px-8 py-3 rounded-full shadow-lg">
              + Add Question
            </Button>
          </div>

          {/* Submission Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-sm border-t border-secondary-hover p-4 z-10">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <span className="text-sm text-secondary-text">
                {questions.length} question{questions.length !== 1 && 's'} configured
              </span>
              <Button type="submit" variant="primary" disabled={loading} className="px-8">
                {loading ? 'Saving...' : 'Save & Publish Form'}
              </Button>
            </div>
          </div>
          
          <div className="h-24"></div> 
        </form>
      </div>
    </AppLayout>
  );
};

export default FormBuilder;