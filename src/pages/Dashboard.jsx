import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formService } from '../api/formService';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import FormCard from '../components/dashboard/FormCard';
import EmptyState from '../components/dashboard/EmptyState';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await formService.getForms();
      setForms(data);
    } catch (err) {
      setError(`Failed to load forms. Please try again. (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    try {
      await formService.deleteForm(id);
      setForms(forms.filter(form => form.id !== id));
    } catch (err) {
      alert('Failed to delete the form.');
    }
  };

  const handleCopyLink = (id) => {
    const shareableLink = `${window.location.origin}/form/${id}`;
    navigator.clipboard.writeText(shareableLink);
    alert('Public link copied to clipboard!'); 
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-secondary-accent animate-pulse font-medium text-lg">
            Loading your workspace...
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary-text">My Forms</h2>
        {forms.length > 0 && (
          <Button onClick={() => navigate('/builder')} variant="primary">
            + Create New Form
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 text-red-400 rounded-r-md">
          {error}
        </div>
      )}

      {forms.length === 0 && !error ? (
        <EmptyState onAction={() => navigate('/builder')} />
      ) : (
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {forms.map((form) => (
            <FormCard 
              key={form.id} 
              form={form} 
              onCopyLink={handleCopyLink}
              onViewResponses={() => navigate(`/analytics/${form.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;