'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostById, updatePost } from '../../lib/posts';

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      const post = getPostById(id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return alert('Title and content required');

    updatePost({
      id: id as string,
      title,
      date: new Date().toISOString(),
      content,
    });

    router.push(`/blog/${id}`);
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded h-64"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </main>
  );
}
