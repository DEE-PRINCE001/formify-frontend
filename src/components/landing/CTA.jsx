import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-primary relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-3xl p-10 md:p-16 text-center border border-secondary-hover relative overflow-hidden shadow-2xl">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-accent rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary-accent rounded-full opacity-10 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">
              Ready to upgrade your workflow?
            </h2>
            <p className="text-xl text-secondary-text mb-10 max-w-2xl mx-auto">
              Join developers and creators who are already using Formify to collect data securely and beautifully.
            </p>
            <Button onClick={() => navigate('/register')} variant="primary" className="px-10 py-4 text-lg rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              Create Your First Form
            </Button>
            <p className="mt-6 text-sm text-secondary-text">
              No credit card required. Connect via OAuth2 instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;