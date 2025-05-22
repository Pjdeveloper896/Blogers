'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return alert('Please enter an email');

    // Call NextAuth signIn with email provider
    const result = await signIn('email', {
      email,
      redirect: false,
    });

    if (result?.error) {
      setMessage('Error sending magic link. Please try again.');
    } else {
      setMessage('Check your email for the magic link to sign in.');
    }
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
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
          Send Magic Link
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </main>
  );
}
