'use client';

import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/generateCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate code');
      }

      const data = await res.json();
      setCode(data.code);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className='text-center m-6 text-3xl'>Factorial Code Generator</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <input
          type="text"
          placeholder="Enter programming language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='w-96 text-black outline-none border-spacing-4 p-3 rounded-xl text-lg m-3'
        />
        <button type="submit" className='m-6 p-3 bg-white rounded-3xl text-black'>Generate Code</button>
      </form>

      {error && <p>{error}</p>}
      {code && (
        <div className='m-12 mt-0 bg-neutral-500 text-black rounded-3xl'>
          <h2 className='px-5 py-3 text-xl text-white bg-neutral-800 rounded-t-2xl'>Output:</h2>
          <pre className='p-5 text-wrap'>{code}</pre>
        </div>
      )}
    </div>
  );
}
