import { fetchReportById, fetchReports } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "./use-redux";
import {
  clearSelectedReportId,
  setReports,
  setSelectedReportId,
} from "@/store/reports";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { ReportWithUserData } from "@/lib/types";

function useQueryReports() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [report, setReport] = useState<ReportWithUserData | null>(null);
  const reports = useAppSelector((state) => state.reportsState.reports);

  const loadReport = async (id: string) => {
    let report = null;
    try {
      report = await fetchReportById(id);
      setReport(report);
      dispatch(setSelectedReportId({ id: report.id }));
    } catch (error) {
      setReport(null);
      dispatch(clearSelectedReportId());
      toast({
        variant: "destructive",
        title: "Failed to fetch report.",
        description:
          (error as Error).message ||
          "There was an error loading the report. Please try again later.",
      });
    }
  };

  const loadReports = async () => {
    try {
      const fetchedReports = await fetchReports();
      dispatch(setReports({ reports: fetchedReports }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch reports",
        description:
          (error as Error).message ||
          "There was an error loading the reports. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return { report, reports, loadReport };
}

export default useQueryReports;
