import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formService } from '../api/formService';
import FormField from '../components/respondent/FormField';
import Button from '../components/ui/Button';

const RespondentPage = () => {
  const { id } = useParams(); // Extract form ID from URL path `/form/:id`
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({}); // Stores state as { [questionTitle]: currentAnswer }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const data = await formService.getFormById(id);
        setForm(data);
        
        // Initialize state mapping questions titles to blank defaults
        const initialAnswers = {};
        data.questions.forEach(q => {
          initialAnswers[q.text] = q.type === 'CHECKBOX' ? [] : '';
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.response?.data?.message || 'Form not found or has been disabled.');
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleFieldChange = (questionTitle, value) => {
    setAnswers({ ...answers, [questionTitle]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // CRITICAL API LOGIC: Transform checkbox arrays into comma-separated strings
    const formattedAnswers = form.questions.map(q => {
      let finalAnswer = answers[q.text];
      
      if (q.type === 'CHECKBOX' && Array.isArray(finalAnswer)) {
        finalAnswer = finalAnswer.join(', ');
      }

      return {
        questionId: q.id,
        answerText: finalAnswer || ''
      };
    });

    const payload = {
      formId: id,
      answers: formattedAnswers
    };

    try {
      await formService.submitResponse(id, payload);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to submit response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center font-inter">
        <p className="text-primary-accent animate-pulse font-medium text-lg">Loading secure form structure...</p>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-inter">
        <div className="bg-secondary p-8 rounded-lg border border-red-500/30 text-center max-w-md w-full shadow-xl">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-primary-text mb-2">Form Unavailable</h3>
          <p className="text-secondary-text text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-inter">
        <div className="bg-secondary p-8 rounded-lg border border-secondary-hover text-center max-w-md w-full shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-accent to-secondary-accent"></div>
          <div className="text-primary-accent text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-primary-text mb-2">Thank you!</h3>
          <p className="text-secondary-text text-sm mb-6">Your submission has been captured securely by Formify.</p>
          <div className="text-xs text-secondary-text/40 border-t border-secondary-hover pt-4">
            Powered by Formify Engine
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-primary-text font-inter py-12 px-4 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Form Title & Banner */}
        <header className="bg-secondary p-8 rounded-lg border-t-8 border-t-secondary-accent shadow-md mb-6 relative overflow-hidden">
          <h1 className="text-3xl font-bold text-primary-text mb-2">{form.title}</h1>
          <p className="text-secondary-text text-sm">{form.description || 'No instructions provided.'}</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 text-red-400 rounded-r-md text-sm">
            {error}
          </div>
        )}

        {/* Form Body Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.questions.map((question) => (
            <FormField
              key={question.id}
              question={question}
              value={answers[question.text]}
              onChange={(value) => handleFieldChange(question.text, value)}
            />
          ))}

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-secondary-text/60">
              Never submit passwords or sensitive credentials through public forms.
            </span>
            <Button type="submit" variant="primary" disabled={submitting} className="px-8 py-2.5 shadow-lg">
              {submitting ? 'Submitting answers...' : 'Submit Form'}
            </Button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default RespondentPage;