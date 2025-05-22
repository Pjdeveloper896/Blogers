'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addPost, updatePost } from '../lib/posts';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  editMode?: boolean;
  initialPost?: {
    id: string;
    title: string;
    content: string;
  };
};

export default function PostForm({ editMode = false, initialPost }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editMode && initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
    }
  }, [editMode, initialPost]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required');

    const post = {
      id: initialPost?.id || uuidv4(),
      title,
      date: new Date().toISOString(),
      content,
    };

    if (editMode) {
      updatePost(post);
      router.push(`/blog/${post.id}`);
    } else {
      addPost(post);
      router.push('/');
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6">{editMode ? 'Edit Post' : 'Add New Post'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded h-64"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          {editMode ? 'Update' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
