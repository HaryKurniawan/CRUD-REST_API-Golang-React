import { useState, useEffect } from 'react';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/post';

interface PostFormProps {
  editingPost: Post | null;
  onSubmit: (payload: CreatePostPayload | UpdatePostPayload) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function PostForm({ editingPost, onSubmit, onCancel, loading }: PostFormProps) {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingPost) { setTitle(editingPost.title); setContent(editingPost.content); }
    else             { setTitle(''); setContent(''); }
  }, [editingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await onSubmit({ title: title.trim(), content: content.trim() });
    setTitle(''); setContent('');
  };

  const isEdit = !!editingPost;

  const inputCls = `
    w-full bg-[var(--color-bg-input)] border border-[var(--color-border)]
    rounded-[var(--radius-input)] px-3.5 py-2.5
    text-sm text-[var(--color-text-base)] placeholder:text-[var(--color-text-subtle)]
    outline-none transition-all duration-150 font-[var(--font-sans)]
    focus:border-[var(--color-border-focus)] focus:bg-white
  `;

  return (
    <div className="
      bg-[var(--color-bg-card)] border border-[var(--color-border)]
      rounded-[var(--radius-card)] p-6
      transition-all duration-200 sticky top-6
    ">
      <h2 className="text-sm font-semibold text-[var(--color-text-base)] mb-5">
          {isEdit ? 'Edit Post' : 'Buat Post Baru'}
        </h2>

      <form id="post-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title-input" className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
            Judul
          </label>
          <input
            id="title-input"
            type="text"
            className={inputCls}
            placeholder="Masukkan judul post..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content-input" className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
            Konten
          </label>
          <textarea
            id="content-input"
            rows={4}
            className={`${inputCls} resize-y min-h-[100px]`}
            placeholder="Tulis konten post di sini..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            id="submit-btn"
            type="submit"
            disabled={loading}
            className="
              flex-1 py-2.5 px-4 rounded-[var(--radius-btn)]
              text-sm font-medium text-white cursor-pointer
              bg-[var(--color-accent)]
              hover:bg-[var(--color-accent-hover)]
              active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150
            "
          >
            {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Post'}
          </button>

          {isEdit && (
            <button
              id="cancel-btn"
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="
                py-2.5 px-4 rounded-[var(--radius-btn)]
                text-sm font-medium cursor-pointer
                text-[var(--color-text-muted)]
                border border-[var(--color-border)]
                hover:text-[var(--color-text-base)] hover:border-[var(--color-text-subtle)]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150
              "
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
