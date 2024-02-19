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

export const LoginDialog = () => {
  const [jhed, setJhed] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { loginUser } = useMutationUser();

  const clearFields = () => {
    setJhed("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!jhed || !password) {
      toast({
        variant: "destructive",
        title: "Sorry! Jhed and password cannot be empty!",
        description: `Please enter your credentials to login.`,
      });
      return;
    }

    loginUser(jhed, password);

    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Click to login"} variant="default">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Provide your credentials here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <DialogField
            title="JHED"
            id="jhed"
            value={jhed}
            textArea={false}
            setField={setJhed}
          />
          <DialogField
            title="Password"
            id="password"
            value={password}
            type="password"
            textArea={false}
            setField={setPassword}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
