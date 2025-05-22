'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostById, deletePost } from '../../lib/posts';

export default function BlogPost() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      const foundPost = getPostById(id);
      setPost(foundPost);
    }
  }, [id]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id as string);
      router.push('/');
    }
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">{new Date(post.date).toLocaleDateString()}</p>
      <div className="whitespace-pre-wrap mb-6">{post.content}</div>

      <div className="flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
