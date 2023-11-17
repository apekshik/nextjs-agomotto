'use client'

import React from 'react';
import Dashboard from './dashboard/Dashboard';
import { useState } from 'react';

const HomePage = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const toggleDashboardVisibility = () => {
    console.log('Toggling Dashboard', !isDashboardVisible);
    setIsDashboardVisible(!isDashboardVisible);
    if (!isDashboardVisible) {
      setTimeout(() => {
        console.log('Scrolling to Dashboard');
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 0); // Timeout ensures the DOM is updated before scrolling
    }
  };
  

  return (
      <main className="h-screen flex flex-col justify-center items-center p-8">
        <div className="text-3xl font-semibold text-center">
          Welcome to Agomotto
        </div>
        <p className="mt-8 text-lg text-center text-black">
          Agomotto is our internal monitoring, analysis, and policing tool for developers working on our main app, Boujè. It plays a crucial role in ensuring the safety of our platform by checking posts for explicit content and performing various safety checks.
        </p>
        {isDashboardVisible && (<section id='dashboard'>
          <Dashboard />
        </section>)}
      </main>
      /* Add more content to make the page longer */
  );
};

export default HomePage;
