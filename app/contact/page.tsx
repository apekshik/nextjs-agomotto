import React from 'react';

const Contact = () => {

  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-black via-green-200 to-black text-white">
      <header className="fixed top-0 left-0 p-8 text-xl font-bold">
        Agomotto
      </header>
      <nav className="fixed top-0 right-0 p-8 space-x-16">
        <a className="text-white font-bold" href="/">Home</a>
        <a className="text-white font-bold" href="/contact">Contact</a>
        <button className="bg-black text-white px-4 py-2 rounded font-bold">Dashboard</button>
      </nav>
      <main className="h-screen flex flex-col justify-center items-center p-8">
      <form className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg text-white">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg">Message:</label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition duration-300"
          >
            Submit
          </button>
        </form>
      </main>
      <footer className="fixed bottom-0 left-0 p-8 space-x-8">
        <a className="text-white" href="/about">About</a>
        <a className="text-white" href="/services">Services</a>
        <a className="text-white" href="/blog">Blog</a>
        <a className="text-white" href="/contact">Contact</a>
      </footer>
    </div>
  );
};

export default Contact;
