import { useToast } from "@/components/ui/use-toast";
import { fetchComments } from "@/lib/api";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./use-redux";
import { clearComments, setComments } from "@/store/reports";

function useQueryComments() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const comments = useAppSelector((state) => state.reportsState.comments);
  const selectedReportId = useAppSelector(
    (state) => state.reportsState.selectedReportId,
  );

  const loadComments = async () => {
    try {
      const fetchedComments = await fetchComments(selectedReportId as string);
      dispatch(setComments({ comments: fetchedComments }));
    } catch (error) {
      dispatch(clearComments());
      toast({
        variant: "destructive",
        title: "Failed to fetch comments",
        description:
          (error as Error).message ||
          "There was an error loading the comments. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (selectedReportId) {
      loadComments();
    } else {
      dispatch(clearComments());
    }
  }, [selectedReportId]);

  return { comments };
}

export default useQueryComments;
