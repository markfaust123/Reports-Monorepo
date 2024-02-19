import { login, logout, register } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUser } from "@/lib/auth";
import { useAppDispatch } from "./use-redux";
import { clearUser, setUser } from "@/store/user";

function useMutationUser() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const registerUser = async (
    jhed: string,
    password: string,
    name: string,
    classYear: string,
    teamName: string,
    position: string,
    isChief: boolean,
    avatarUrl?: string,
  ) => {
    try {
      await register(
        jhed,
        password,
        name,
        classYear,
        teamName,
        position,
        isChief,
        avatarUrl,
      );
      toast({
        variant: "default",
        title: "Registration successful",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (error as Error).message ||
          "There was an error registering you. Please try again later.",
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      dispatch(setUser({ user }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      dispatch(clearUser());
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description:
          (error as Error).message ||
          "There was an error signing you out. Please try again later.",
      });
    }
  };

  useEffect(() => {
    try {
      const user = getAuthenticatedUser();
      dispatch(setUser({ user }));
    } catch (error) {
      dispatch(clearUser());
    }
  }, []);

  return { registerUser, loginUser, logoutUser };
}

export default useMutationUser;
