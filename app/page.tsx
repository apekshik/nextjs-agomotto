import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-[200vh] bg-gradient-to-b from-black via-blue-900 to-black text-white">
      <header className="fixed top-0 left-0 p-4 text-xl font-bold">
        Agomotto
      </header>
      <nav className="fixed top-0 right-0 p-4 space-x-4">
        <a className="text-blue-500 hover:underline" href="/">Home</a>
        <a className="text-blue-500 hover:underline" href="/contact">Contact</a>
        <button className="bg-black text-white px-4 py-2 rounded">Dashboard</button>
      </nav>
      <main className="h-screen flex flex-col justify-center items-center">
        <div className="text-3xl font-semibold text-center">
          Welcome to Agomotto
        </div>
        {/* Add your website content here */}
      </main>
      {/* Add more content to make the page longer */}
    </div>
  );
};

export default HomePage;
