'use client'

import React from 'react';

const HomePage = () => {
  return (
      <main className="h-screen flex flex-col justify-center items-center p-8">
        <div className="text-3xl font-semibold text-center">
          Welcome to Agomotto
        </div>
        <p className="mt-8 text-lg text-center text-black">
          Agomotto is our internal monitoring, analysis, and policing tool for developers working on our main app, Boujè. It plays a crucial role in ensuring the safety of our platform by checking posts for explicit content and performing various safety checks.
        </p>
      </main>
  );
};

export default HomePage;
