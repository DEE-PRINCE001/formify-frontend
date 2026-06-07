import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Construct your form',
    description: 'Use the intuitive, block-based builder to add text fields, multiple choices, and checkboxes. Toggle required fields and set your data types with zero code.',
    alignment: 'left',

    visual: (
      <div className="w-full space-y-3">
        <div className="h-8 w-3/4 bg-primary rounded border border-secondary-hover mb-6"></div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-secondary-text"></div>
          <div className="h-3 w-1/2 bg-secondary-text/30 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-primary-accent bg-primary-accent/20"></div>
          <div className="h-3 w-2/3 bg-primary-text rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-secondary-text"></div>
          <div className="h-3 w-1/3 bg-secondary-text/30 rounded"></div>
        </div>
      </div>
    )
  },
  {
    number: '02',
    title: 'Deploy instantly',
    description: 'Hit save and get a secure, CDN-backed public URL immediately. Share it via email, social media, or embed it. It works flawlessly on any device.',
    alignment: 'right',
    
    visual: (
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full bg-primary border border-secondary-hover rounded-full flex items-center p-1.5 pl-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-secondary-text text-xs truncate flex-1 font-mono">
            formify-navy-pi.vercel.app/form/abc-123
          </span>
          <div className="bg-primary-accent text-primary text-xs font-bold px-4 py-2 rounded-full">
            Copy
          </div>
        </div>
      </div>
    )
  },
  {
    number: '03',
    title: 'Analyze in real-time',
    description: 'Watch the responses roll in. Our backend engine instantly aggregates checkbox arrays and multiple-choice frequencies into beautiful bento-box charts.',
    alignment: 'left',
    // CSS art mimicking the Analytics Progress Bars
    visual: (
      <div className="w-full space-y-5 mt-2">
        <div>
          <div className="flex justify-between mb-2">
            <div className="h-2 w-20 bg-primary-text rounded"></div>
            <div className="h-2 w-8 bg-secondary-text rounded"></div>
          </div>
          <div className="w-full bg-primary rounded-full h-2">
            <div className="bg-primary-accent h-2 rounded-full w-[75%] shadow-[0_0_10px_rgba(0,212,255,0.5)]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <div className="h-2 w-24 bg-primary-text rounded"></div>
            <div className="h-2 w-8 bg-secondary-text rounded"></div>
          </div>
          <div className="w-full bg-primary rounded-full h-2">
            <div className="bg-secondary-accent h-2 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>
    )
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden border-t border-secondary-hover">
      
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary-accent text-sm font-bold tracking-widest uppercase mb-3">
            The Workflow
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">
            From concept to data in minutes.
          </h3>
          <p className="text-lg text-secondary-text">
            No complex configurations. Formify streamlines the data collection process so you can focus on the insights, not the setup.
          </p>
        </div>

        <div className="relative">
          {/* Central glowing line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-accent via-secondary-accent to-transparent -translate-x-1/2 opacity-30"></div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  step.alignment === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Text Content */}
                <div className={`flex-1 lg:w-1/2 ${step.alignment === 'right' ? 'lg:text-left' : 'lg:text-right'}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary border border-secondary-hover text-primary-accent font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,212,255,0.15)] ${step.alignment === 'right' ? '' : 'lg:ml-auto'}`}>
                    {step.number}
                  </div>
                  <h4 className="text-2xl font-bold text-primary-text mb-4">
                    {step.title}
                  </h4>
                  <p className="text-secondary-text leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>

                {/* CSS Art Visual Box */}
                <div className="flex-1 lg:w-1/2 w-full">
                  <div className="bg-secondary p-8 rounded-2xl border border-secondary-hover shadow-xl relative group">
                    {/* Subtle hover glow effect on the box */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    
                    {/* The actual abstract UI */}
                    <div className="relative z-10 h-48 flex flex-col justify-center">
                      {step.visual}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;