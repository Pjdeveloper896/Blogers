import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <nav className="shadow-md p-4 w-full mb-2 bg-blue-700 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Blogers</h1>
      <div className="space-x-4">
        <Link href="/">
          <span className="hover:underline cursor-pointer">Home</span>
        </Link>
        <Link href="/about">
          <span className="hover:underline cursor-pointer">About</span>
        </Link>
        <Link href="/new">
          <span className="hover:underline cursor-pointer">New Post</span>
        </Link>
      </div>
    </nav>
  );
}
