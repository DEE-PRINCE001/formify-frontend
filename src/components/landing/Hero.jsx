import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-primary pt-[120px] pb-20 lg:pt-[150px] lg:pb-28">
      {/* Abstract Glowing Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-accent to-secondary-accent blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-secondary-hover text-sm text-primary-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse"></span>
          Formify Engine v1.0 is live
        </div>
            
        <h1 className="text-5xl md:text-7xl font-bold text-primary-text tracking-tight mb-6 leading-tight">
          Collect data with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">
            absolute precision.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary-text mb-10">
          A developer-first form builder engineered for beautiful respondent experiences and powerful, instant data aggregation. Drop the legacy tools and build at the speed of thought.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => navigate('/register')} variant="primary" className="w-full sm:w-auto px-8 py-3.5 text-lg">
            Start Building Free
          </Button>
          <Button onClick={() => navigate('/login')} variant="secondary" className="w-full sm:w-auto px-8 py-3.5 text-lg">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;