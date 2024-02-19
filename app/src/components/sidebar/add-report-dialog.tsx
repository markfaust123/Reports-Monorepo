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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationReports from "@/hooks/use-mutation-reports";
import { useToast } from "../ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import DialogField from "../util/dialog-field";

export const AddReportDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { addNewReport } = useMutationReports();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);

  const handleSubmit = async () => {
    if (title && description && url) {
      await addNewReport(title, description, url);
    } else {
      toast({
        variant: "destructive",
        title: "Sorry! Details cannot be empty! 🙁",
        description: "Please enter all report details.",
      });
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setUrl("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Report"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Report</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the details of your report here."
              : "Please login to submit a report."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <DialogField
              title="Title"
              id="title"
              value={title}
              textArea={false}
              placeholder={`Ex: "Week X Progress Report"`}
              setField={setTitle}
            />
            <DialogField
              title="Description"
              id="description"
              value={description}
              textArea={true}
              placeholder={`Ex: "Completion of A B C"`}
              setField={setDescription}
            />
            <DialogField
              title="URL"
              id="url"
              value={url}
              textArea={false}
              placeholder={`Ex: "https://google.drive/MyReport.pdf"`}
              setField={setUrl}
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
                <Button type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
