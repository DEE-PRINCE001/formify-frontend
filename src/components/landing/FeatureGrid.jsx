import React from 'react';

const features = [
  {
    title: 'Dynamic Question Engine',
    description: 'Support for short text, multiple choice, and checkbox arrays out of the box with strict API-level validation.',
    icon: '⚡',
  },
  {
    title: 'Instant Data Aggregation',
    description: 'Our backend handles the heavy lifting, instantly calculating frequencies and generating real-time progress bars.',
    icon: '📊',
  },
  {
    title: 'One-Click CSV Exports',
    description: 'Take your data anywhere. Export thousands of clean, formatted responses to CSV instantly.',
    icon: '📑',
  },
  {
    title: 'Secure JWT Authentication',
    description: 'Enterprise-grade security using JSON Web Tokens. Your workspace and responses are completely isolated.',
    icon: '🔒',
  },
  {
    title: 'Lightning Fast CDN',
    description: 'Forms load instantly for respondents globally, ensuring maximum completion rates without loading spinners.',
    icon: '🌍',
  },
  {
    title: 'Dark Mode Native',
    description: 'A beautiful, eye-catching dark and neon aesthetic built right into the core layout engine.',
    icon: '🌙',
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-20 bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-secondary-text text-lg">
            Formify cuts through the bloat, giving you an optimized workflow for creating forms and analyzing data in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-secondary p-8 rounded-2xl border border-secondary-hover hover:border-secondary-accent/50 transition-colors group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-text mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary-text leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;