import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import FeatureGrid from '../components/landing/FeatureGrid';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import Button from '../components/ui/Button';
import HowItWorks from '../components/landing/HowItWorks';
import AnimateOnScroll from '../components/AnimateOnScroll';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary font-inter selection:bg-primary-accent selection:text-primary">

      <nav className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary-hover transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => window.scrollTo(0, 0)}
          >
            <h1 className="text-2xl font-bold text-primary-accent tracking-wide">
              Formify
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')} 
              className="text-secondary-text hover:text-primary-text text-sm font-medium transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <Button onClick={() => navigate('/register')} variant="primary" className="text-sm py-1.5 px-5">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <AnimateOnScroll variant='fadeUp'>
          <Hero />
        </AnimateOnScroll>
        <FeatureGrid />
        <AnimateOnScroll variant='fadeLeft'>
          <HowItWorks/>
        </AnimateOnScroll>
        <AnimateOnScroll variant='zoom'>
          <CTA />
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;