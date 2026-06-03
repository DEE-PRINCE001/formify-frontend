import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formService } from '../api/formService';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import StatCard from '../components/analytics/StatCard';
import ProgressBar from '../components/analytics/ProgressBar';

const AnalyticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [id]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Fetch both the form schema (to know the questions) and the secure responses
      const [formData, responseData] = await Promise.all([
        formService.getFormById(id), // Public endpoint works here to get schema
        formService.getFormResponses(id) // Protected endpoint for the data
      ]);
      
      setForm(formData);
      setResponses(responseData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analytics. Are you the owner of this form?');
    } finally {
      setLoading(false);
    }
  };

  // --- DATA AGGREGATION LOGIC ---
  // We need to process the raw responses into a format easily readable by our charts
  const getAggregatedData = (question) => {
    const allAnswers = responses
      .flatMap(res => res.answers)
      .filter(ans => ans.questionTitle === question.title && ans.answer !== '');

    const totalAnswers = allAnswers.length;

    if (question.type === 'TEXT') {
      return { total: totalAnswers, texts: allAnswers.map(a => a.answer) };
    }

    // For MULTIPLE_CHOICE and CHECKBOX, count frequencies
    const frequencies = {};
    question.options.forEach(opt => frequencies[opt] = 0); // Initialize with 0

    allAnswers.forEach(a => {
      if (question.type === 'CHECKBOX') {
        // Checkboxes are comma-separated strings (e.g., "Apple, Banana")
        const selectedOpts = a.answer.split(',').map(s => s.trim());
        selectedOpts.forEach(opt => {
          if (frequencies[opt] !== undefined) frequencies[opt]++;
        });
      } else {
        if (frequencies[a.answer] !== undefined) frequencies[a.answer]++;
      }
    });

    return { total: totalAnswers, frequencies };
  };

  const exportToCSV = () => {
    // Basic CSV Export Logic
    if (!responses.length) return alert('No data to export.');
    
    const headers = form.questions.map(q => q.title).join(',');
    const rows = responses.map(res => {
      return form.questions.map(q => {
        const answerObj = res.answers.find(a => a.questionTitle === q.title);
        // Wrap in quotes to escape commas in answers
        return `"${answerObj ? answerObj.answer.replace(/"/g, '""') : ''}"`;
      }).join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${form.title}_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-primary-accent animate-pulse font-medium text-lg">Crunching data...</p>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6 bg-red-900/20 border-l-4 border-red-500 text-red-400 rounded-md max-w-2xl mx-auto mt-8">
          <h3 className="font-bold text-lg mb-2">Access Denied</h3>
          <p>{error}</p>
          <Button onClick={() => navigate('/dashboard')} variant="secondary" className="mt-4">Return to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button onClick={() => navigate('/dashboard')} className="text-secondary-text hover:text-primary-accent text-sm mb-2 transition-colors">
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-primary-text">{form.title}</h2>
          <p className="text-secondary-text mt-1">Analytics & Responses Overview</p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={fetchAnalyticsData} variant="secondary">Refresh Data</Button>
          <Button onClick={exportToCSV} variant="primary">Export CSV</Button>
        </div>
      </div>

      {/* KPI STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Responses" value={responses.length} icon="📊" />
        <StatCard title="Questions" value={form.questions.length} icon="📝" />
        <StatCard 
          title="Last Response" 
          value={responses.length > 0 ? 'Recently' : 'Never'} 
          icon="⚡" 
        />
      </div>

      {/* RESPONSES GRID (Bento Box Layout) */}
      {responses.length === 0 ? (
        <div className="text-center py-16 bg-secondary border border-dashed border-secondary-text rounded-xl">
          <p className="text-secondary-text text-lg">No responses have been submitted yet.</p>
          <p className="text-sm mt-2 text-secondary-text/60">Share your form link to start collecting data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {form.questions.map((question, qIdx) => {
            const data = getAggregatedData(question);
            
            return (
              <div key={qIdx} className="bg-secondary rounded-xl border border-secondary-hover shadow-lg p-6 hover:border-secondary-text/50 transition-colors">
                <div className="mb-6 pb-4 border-b border-secondary-hover">
                  <span className="text-xs font-bold text-primary-accent uppercase tracking-wider mb-1 block">
                    Question {qIdx + 1} • {question.type.replace('_', ' ')}
                  </span>
                  <h3 className="text-xl font-semibold text-primary-text">{question.title}</h3>
                  <p className="text-sm text-secondary-text mt-1">{data.total} responses</p>
                </div>

                {/* RENDER TEXT ANSWERS */}
                {question.type === 'TEXT' && (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {data.texts.length === 0 ? (
                      <p className="text-sm text-secondary-text italic">No written answers provided.</p>
                    ) : (
                      data.texts.map((text, tIdx) => (
                        <div key={tIdx} className="bg-primary p-3 rounded-md text-sm text-primary-text border border-secondary-hover">
                          "{text}"
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* RENDER CHOICE ANSWERS (BAR CHARTS) */}
                {(question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX') && (
                  <div className="space-y-1">
                    {question.options.map((opt, optIdx) => (
                      <ProgressBar 
                        key={optIdx} 
                        index={optIdx}
                        label={opt} 
                        count={data.frequencies[opt] || 0} 
                        total={data.total} 
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default AnalyticsPage;