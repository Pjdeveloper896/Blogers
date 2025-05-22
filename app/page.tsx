'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from './lib/posts';
import Nav from './Nav';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const data = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(data);
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <Nav />
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <Link href="/new" className="text-blue-600 underline mb-6 block">
        Add New Post
      </Link>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-4">
              <Link href={`/blog/${post.id}`} className="text-2xl font-semibold text-blue-700 hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
