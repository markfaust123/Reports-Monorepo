import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import useMutationComments from "@/hooks/use-mutations-comments";
import { useAppSelector } from "@/hooks/use-redux";
import DialogField from "../util/dialog-field";

export const AddCommentDialog = () => {
  const [content, setContent] = useState<string>("");
  const { addNewComment } = useMutationComments();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);

  const handleSave = async () => {
    if (!content) {
      toast({
        variant: "destructive",
        title: "Sorry! Content cannot be empty! 🙁",
        description: `Please enter the content for your comment.`,
      });
      return;
    }
    await addNewComment(content);
    setContent("");
  };

  const handleCancel = () => {
    setContent("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label={"Make a Comment"}
          variant="secondary"
          size="sm"
          className="w-full m-2"
        >
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your comment here."
              : "Please login to make a comment."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <DialogField
              id="content"
              value={content}
              textArea={true}
              placeholder={`Ex: "Good work." or "Please rewrite your analysis in Section 3. Then, resubmit or update the report."`}
              setField={setContent}
            />
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <>
              <DialogClose asChild>
                <Button
                  variant={"secondary"}
                  type="reset"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={handleSave}>
                  Save
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
