import Aside from "@/components/aside";
import Comments from "@/components/comment/comments";
import Report from "@/components/report/report";
import Sidebar from "@/components/sidebar/sidebar";
import useQueryReports from "@/hooks/use-query-reports";
import { useAppSelector } from "@/hooks/use-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReportView = () => {
  const { reportId } = useParams();
  const { report, loadReport } = useQueryReports();
  const selectedReportId = useAppSelector(
    (state) => state.reportsState.selectedReportId,
  );

  useEffect(() => {
    if (reportId) {
      loadReport(reportId);
    }
  }, [reportId]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen border-x border-slate-400 md:max-w-xl">
        {report && <Report report={report} />}
        {report && selectedReportId && <Comments />}
      </div>
      <Aside />
    </>
  );
};

export default ReportView;
