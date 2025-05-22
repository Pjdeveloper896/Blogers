'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return alert('Please enter an email');

    // Here you can store the email to your DB or API for registration
    // For demo, we just save in localStorage
    let users = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
    if (!users.includes(email)) {
      users.push(email);
      localStorage.setItem('registeredEmails', JSON.stringify(users));
      setMessage('Registered successfully! Now please sign in using your email.');
    } else {
      setMessage('Email already registered. Please sign in.');
    }
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600">
          {message} <br />
          <button
            className="text-blue-700 underline"
            onClick={() => router.push('/auth/signin')}
          >
            Go to Sign In
          </button>
        </p>
      )}
    </main>
  );
}
