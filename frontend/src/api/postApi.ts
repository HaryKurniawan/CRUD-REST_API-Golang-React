import axios from 'axios';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/post';

const BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>('/posts');
  return res.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const res = await api.post<Post>('/posts', payload);
  return res.data;
};

export const updatePost = async (id: number, payload: UpdatePostPayload): Promise<Post> => {
  const res = await api.put<Post>(`/posts/${id}`, payload);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
