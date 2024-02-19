import { createComment } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./use-redux";
import { addComment } from "@/store/reports";

function useMutationComments() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const selectedReportId = useAppSelector(
    (state) => state.reportsState.selectedReportId,
  );

  const addNewComment = async (content: string) => {
    try {
      const newComment = await createComment(
        selectedReportId as string,
        content,
      );
      dispatch(addComment({ comment: newComment }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the comment",
        description:
          (error as Error).message ||
          "There was an error creating the comment. Please try again later.",
      });
    }
  };

  return { addNewComment };
}

export default useMutationComments;
