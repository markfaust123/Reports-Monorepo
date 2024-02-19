import { Button } from "@/components/ui/button";
import {
  ChatBubbleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import ReportActions from "./report-actions";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { clearSelectedReportId, setSelectedReportId } from "@/store/reports";
import type { Report } from "@/lib/types";

function ReportFooter({ report, jhed }: { report: Report; jhed?: string }) {
  const dispatch = useAppDispatch();
  const { id: reportId, readCount, commentCount } = report;
  const [reads, setReads] = useState<number>(0);
  // TODO: Get rid of reportRead local state if not tinging yellow
  // (would need ot store this data in database to persist knowledge
  // of having read report...)
  const [reportRead, setReportRead] = useState<boolean>(false);
  const [comments, setComments] = useState<number>(0);
  const selectedReportId = useAppSelector(
    (state) => state.reportsState.selectedReportId,
  );

  const showComments = (event: SyntheticEvent) => {
    event.preventDefault();
    if (selectedReportId === reportId) {
      dispatch(clearSelectedReportId());
    } else {
      dispatch(setSelectedReportId({ id: reportId }));
    }
  };

  useEffect(() => {
    if (readCount !== reads) {
      setReads(readCount);
    }
    if (commentCount !== comments) {
      setComments(commentCount);
    }
  }, [readCount, commentCount]);

  return (
    <div className="flex justify-between mb-2">
      <Button
        onClick={() => {
          if (reportRead) {
            setReportRead(false);
            setReads((currReads) => currReads - 1);
          } else {
            setReportRead(true);
            setReads((currReads) => currReads + 1);
          }
        }}
        variant="ghost"
        size="sm"
      >
        {reads > 0 ? (
          <EyeOpenIcon className="w-5 h-5 opacity-50" />
        ) : (
          <EyeClosedIcon className="w-5 h-5 opacity-50" />
        )}
        {reads > 0 && <sup>{reads}</sup>}
      </Button>
      <Button variant="ghost" size="sm" onClick={showComments}>
        <ChatBubbleIcon className="w-5 h-5 opacity-50" />
        {comments > 0 && <sup>&nbsp;{comments}</sup>}
      </Button>
      <ReportActions reportId={reportId} jhed={jhed} />
    </div>
  );
}

export default ReportFooter;
