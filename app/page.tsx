'use client'

import React from 'react';
import Dashboard from './dashboard/Dashboard';
import { useState } from 'react';


const HomePage = () => {
  // const [showDashboard, setShowDashboard] = useState(false);
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
  
  // const toggleDashboard = () => {
  //   setShowDashboard(!showDashboard);
  //   if (!showDashboard) {
  //     scrollToDashboard();
  //   }
  // };

  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-black via-green-200 to-black text-white">
      <header className="fixed top-0 left-0 p-8 text-xl font-bold">
        Agomotto
      </header>
      <nav className="fixed top-0 right-0 p-8 space-x-16">
        <a className="text-white font-bold" href="/">Home</a>
        <a className="text-white font-bold" href="/contact">Contact</a>
        <button onClick={toggleDashboardVisibility} className="bg-black text-white px-4 py-2 rounded font-bold">Dashboard</button>
      </nav>
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
      {/* Add more content to make the page longer */}
      <footer className="fixed bottom-0 left-0 p-8 space-x-8">
        <a className="text-white" href="/about">About</a>
        <a className="text-white" href="/services">Services</a>
        <a className="text-white" href="/blog">Blog</a>
        <a className="text-white" href="/contact">Contact</a>
      </footer>
    </div>
  );
};

export default HomePage;
