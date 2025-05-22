'use client';

export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
};

const STORAGE_KEY = 'my-blog-posts';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getPosts(): Post[] {
  if (!isBrowser()) return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getPostById(id: string): Post | undefined {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
}

export function addPost(post: Post): void {
  const posts = getPosts();
  posts.unshift(post); // add to top
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function updatePost(updatedPost: Post): void {
  const posts = getPosts().map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(id: string): void {
  const posts = getPosts().filter((post) => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
