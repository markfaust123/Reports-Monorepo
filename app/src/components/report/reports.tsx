import { useAppSelector } from "@/hooks/use-redux";
import Report from "./report";
import useQueryReports from "@/hooks/use-query-reports";
import Comments from "../comment/comments";

const Reports = () => {
  const { reports } = useQueryReports();
  const selectedReportId = useAppSelector(
    (state) => state.reportsState.selectedReportId,
  );

  return (
    <div className="">
      {reports.map((report) => (
        <div key={report.id}>
          <Report report={report} />
          {report.id === selectedReportId && <Comments />}
        </div>
      ))}
    </div>
  );
};

export default Reports;
