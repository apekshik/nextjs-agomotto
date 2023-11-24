'use client'

import { useState } from 'react';
import React from 'react';
import { FormEvent } from 'react';


const Contact = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", message);

    const res = await fetch('api/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      })
    });

    const {msg, success} = await res.json();
    setError(msg);
    setSuccess(success);
    if (success){
      setFullname("");
      setEmail("");
      setMessage("");
    }
  }


  return (
    <main className="h-screen flex flex-col justify-center items-center p-8">
      <form className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg text-white" onSubmit={onSubmit} method='POST'>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={e => setFullname(e.target.value)}
            value={fullname}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg">Message:</label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:border-green-200"
            onChange={e => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition duration-300"
        >
          Submit
        </button>
      </form>
      <div className='bg-slate-100 flex flex-col'>
        {
          error  && error.length > 0 && error.map((e, index) => 
            <div key={index} className={`${success ? 'text-green-800' : 'text-red-600'} px-5 py-2`}>{e}</div>
          )
        }
      </div>
    </main>
  );
};

export default Contact;
