import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMutationReports from "@/hooks/use-mutation-reports";
import { useAppSelector } from "@/hooks/use-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReportActions = ({
  reportId,
  jhed,
}: {
  reportId: string;
  jhed?: string;
}) => {
  const { deleteReportById } = useMutationReports();
  const user = useAppSelector((state) => state.userState.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user && user.jhed === jhed) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, jhed]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {isOwner && <DropdownMenuItem>Edit report</DropdownMenuItem>}
        <DropdownMenuItem>
          <Link to={`reports/${reportId}`}>Link to report</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-yellow-500">
          Favorite report
        </DropdownMenuItem>
        {isOwner && (
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => deleteReportById(reportId)}
          >
            Delete report
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportActions;
