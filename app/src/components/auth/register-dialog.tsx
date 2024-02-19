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
import useMutationUser from "@/hooks/use-mutations-users";
import DialogField from "../util/dialog-field";

export const RegisterDialog = () => {
  const [jhed, setJhed] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [classYear, setClassYear] = useState("");
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState("");
  const [isChief, setIsChief] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { toast } = useToast();
  const { registerUser } = useMutationUser();

  const clearFields = () => {
    setJhed("");
    setPassword("");
    setName("");
    setClassYear("");
    setTeamName("");
    setPosition("");
    setIsChief("");
    setAvatarUrl("");
  };

  const handleRegister = async () => {
    // TODO: Add some sort of validation (could partly be
    // handled by buttons)
    if (
      !jhed ||
      !password ||
      !name ||
      !classYear ||
      !teamName ||
      !position ||
      !isChief
    ) {
      toast({
        variant: "destructive",
        title: "Sorry! Only Avatar URL can be empty! 🙁",
        description: `Please enter the required information to register.`,
      });
      return;
    }

    registerUser(
      jhed,
      password,
      name,
      classYear,
      teamName,
      position,
      isChief === "Yes" ? true : false,
      avatarUrl,
    );

    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Click to register"} variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please complete this form to register.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <DialogField
            title="Name"
            id="name"
            value={name}
            textArea={false}
            placeholder={`Ex: "Mark Faust"`}
            setField={setName}
          />
          <DialogField
            title="JHED"
            id="jhed"
            value={jhed}
            textArea={false}
            placeholder={`Ex: "mfaust4"`}
            setField={setJhed}
          />
          <DialogField
            title="Password"
            id="password"
            value={password}
            textArea={false}
            type="password"
            placeholder={`Ex: <jhed_password>`}
            setField={setPassword}
          />
          <DialogField
            title="Class Year"
            id="classYear"
            value={classYear}
            textArea={false}
            placeholder={`Ex: "2026"`}
            setField={setClassYear}
          />
          <DialogField
            title="Team Name"
            id="teamName"
            value={teamName}
            textArea={false}
            placeholder={`Ex: "The Gold Sentiment Report"`}
            setField={setTeamName}
          />
          <DialogField
            title="Position"
            id="position"
            value={position}
            textArea={false}
            placeholder={`Ex: "Chief"`}
            setField={setPosition}
          />
          <DialogField
            title="Chief"
            id="chief"
            value={isChief}
            textArea={false}
            placeholder={`Ex: "Yes" or "No"`}
            setField={setIsChief}
          />
          <DialogField
            title="Avatar URL"
            id="avatarUrl"
            value={avatarUrl}
            textArea={false}
            placeholder={`Ex: "https://google.drive/ProfilePic.png"`}
            setField={setAvatarUrl}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
