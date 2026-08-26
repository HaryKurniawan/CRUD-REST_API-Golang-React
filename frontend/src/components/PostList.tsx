import PostCard from './PostCard';
import type { Post } from '../types/post';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostList({ posts, loading, onEdit, onDelete }: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-[var(--color-text-subtle)]">
        <div className="
          w-8 h-8 rounded-full
          border-2 border-[var(--color-border)] border-t-[var(--color-accent)]
          animate-spin-slow
        " />
        <p className="text-xs">Memuat posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="
        text-center py-14 px-8
        bg-[var(--color-bg-card)] border border-dashed border-[var(--color-border)]
        rounded-[var(--radius-card)] text-[var(--color-text-subtle)]
      ">
        <div className="text-4xl mb-3 opacity-40">○</div>
        <p className="text-sm font-medium text-[var(--color-text-muted)] mb-1">Belum ada post</p>
        <p className="text-xs">Mulai dengan membuat post pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
