import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  return (
    <div className="
      animate-fade-in-up
      bg-[var(--color-bg-card)] border border-[var(--color-border)]
      rounded-[var(--radius-card)] p-5
      hover:border-[var(--color-accent)]/30
      transition-all duration-200
    ">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-medium text-[var(--color-text-base)] leading-snug break-words">
          {post.title}
        </h3>
        <span className="
          shrink-0 text-xs text-[var(--color-text-subtle)]
          bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded-md
        ">
          #{post.id}
        </span>
      </div>

      <p className="
        text-sm text-[var(--color-text-muted)] leading-relaxed mb-4
        line-clamp-3 break-words
      ">
        {post.content}
      </p>

      <div className="
        flex items-center justify-between flex-wrap gap-3
        pt-3 border-t border-[var(--color-border)]
      ">
        <span className="text-xs text-[var(--color-text-subtle)]">
          {formatDate(post.created_at)}
        </span>
        <div className="flex gap-1.5">
          <button
            id={`edit-btn-${post.id}`}
            onClick={() => onEdit(post)}
            className="
              text-xs font-medium px-3 py-1.5 rounded-[var(--radius-btn)]
              bg-[var(--color-edit-bg)] text-[var(--color-accent)]
              border border-[var(--color-edit-border)]
              hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]
              transition-all duration-150 cursor-pointer
            "
          >
            Edit
          </button>
          <button
            id={`delete-btn-${post.id}`}
            onClick={() => onDelete(post.id)}
            className="
              text-xs font-medium px-3 py-1.5 rounded-[var(--radius-btn)]
              bg-[var(--color-delete-bg)] text-[var(--color-error)]
              border border-[var(--color-delete-border)]
              hover:bg-[var(--color-error)] hover:text-white hover:border-[var(--color-error)]
              transition-all duration-150 cursor-pointer
            "
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
