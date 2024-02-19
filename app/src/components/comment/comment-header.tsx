import { formatTimestamp } from "@/lib/utils";

type CommentHeaderProps = {
  name: string; // author's display name
  jhed: string; // author's jhed
  timestamp: string; // post's timestamp
};

const CommentHeader = ({ name, jhed, timestamp }: CommentHeaderProps) => {
  return (
    <div className="flex justify-between text-sm text-muted-foreground">
      <p>
        {name} ({`@${jhed}`})
      </p>
      <p>{formatTimestamp(timestamp)}</p>
    </div>
  );
};

export default CommentHeader;
