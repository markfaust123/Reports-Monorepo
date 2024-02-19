import { formatTimestamp } from "@/lib/utils";

type ReportHeaderProps = {
  name: string; // author's display name
  jhed: string; // author's jhed
  timestamp: string; // report's timestamp
};

const ReportHeader = ({ name, jhed, timestamp }: ReportHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{`@${jhed}`}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatTimestamp(timestamp)}
      </p>
    </div>
  );
};

export default ReportHeader;
