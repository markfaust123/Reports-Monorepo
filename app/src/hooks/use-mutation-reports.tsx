import { createReport, deleteReport } from "@/lib/api";
import { useAppDispatch } from "./use-redux";
import { addReport, removeReport } from "@/store/reports";
import { useToast } from "@/components/ui/use-toast";

function useMutationReports() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const addNewReport = async (
    title: string,
    description: string,
    url: string,
  ) => {
    try {
      const newReport = await createReport(title, description, url);
      dispatch(addReport({ report: newReport }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the report",
        description:
          (error as Error).message ||
          "There was an error creating the report. Please try again later.",
      });
    }
  };

  const deleteReportById = async (reportId: string) => {
    try {
      await deleteReport(reportId);
      dispatch(removeReport({ removeId: reportId }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete report",
        description:
          (error as Error).message ||
          "There was an error deleting the report. Please try again later.",
      });
    }
  };

  return { addNewReport, deleteReportById };
}

export default useMutationReports;
