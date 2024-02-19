import CommentHeader from "./comment-header";
import type { CommentWithUserData } from "@/lib/types";

const Comment = ({ comment }: { comment: CommentWithUserData }) => {
  const { content, user, timestamp } = comment;

  const name = user?.name ?? "Unknown";
  const username = user?.jhed ?? "Unknown";

  return (
    <div className="flex border-b border-slate-400">
      <div className="w-full p-4">
        <CommentHeader name={name} jhed={username} timestamp={timestamp} />
        <div className="mt-2">{content}</div>
      </div>
    </div>
  );
};

export default Comment;
