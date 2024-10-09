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
      <h1>Factorial Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter programming language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <button type="submit">Generate Code</button>
      </form>

      {error && <p>{error}</p>}
      {code && (
        <div>
          <h2>Generated Code:</h2>
          <pre>{code}</pre>
        </div>
      )}
    </div>
  );
}
