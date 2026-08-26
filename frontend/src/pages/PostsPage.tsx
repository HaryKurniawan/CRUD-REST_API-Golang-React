import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import type { Post } from '../types/post';
import * as postApi from '../api/postApi';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function PostsPage() {
  const [posts,       setPosts]       = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [listLoading, setListLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setListLoading(true);
    try {
      setPosts(await postApi.getAllPosts());
    } catch {
      notification.error({
        message: 'Error',
        description: 'Gagal memuat posts. Pastikan backend sudah berjalan di port 8081.',
        placement: 'topRight',
      });
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSubmit = async (payload: { title: string; content: string }) => {
    setFormLoading(true);
    try {
      if (editingPost) {
        await postApi.updatePost(editingPost.id, payload);
        notification.success({
          message: 'Berhasil',
          description: 'Post berhasil diupdate!',
          placement: 'topRight',
        });
        setEditingPost(null);
      } else {
        await postApi.createPost(payload);
        notification.success({
          message: 'Berhasil',
          description: 'Post berhasil dibuat!',
          placement: 'topRight',
        });
      }
      await fetchPosts();
    } catch {
      notification.error({
        message: 'Error',
        description: 'Gagal menyimpan post. Silakan coba lagi.',
        placement: 'topRight',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus post ini?')) return;
    try {
      await postApi.deletePost(id);
      notification.success({
        message: 'Berhasil',
        description: 'Post berhasil dihapus.',
        placement: 'topRight',
      });
      await fetchPosts();
    } catch {
      notification.error({
        message: 'Error',
        description: 'Gagal menghapus post.',
        placement: 'topRight',
      });
    }
  };


  const handleEdit = (post: Post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20">

      {/* ── Header ── */}
      <header className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-base)]">
            Post Manager
          </h1>
          <p className="text-sm text-[var(--color-text-subtle)] mt-0.5">
            Go REST API · React · PostgreSQL
          </p>
        </div>
        <span className="
          text-xs font-medium text-[var(--color-accent)]
          bg-[var(--color-accent-muted)]
          px-3 py-1 rounded-full
        ">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </span>
      </header>


      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">

        {/* Form */}
        <section>
          <PostForm
            editingPost={editingPost}
            onSubmit={handleSubmit}
            onCancel={() => setEditingPost(null)}
            loading={formLoading}
          />
        </section>

        {/* Posts list */}
        <section>
          <div className="mb-5">
            <h2 className="text-sm font-medium text-[var(--color-text-muted)]">
              Daftar Post
            </h2>
          </div>

          <PostList
            posts={posts}
            loading={listLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}

