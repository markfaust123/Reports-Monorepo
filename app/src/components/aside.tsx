import { LogoutDialog } from "./auth/logout-dialog";
import { RegisterDialog } from "./auth/register-dialog";
import { LoginDialog } from "./auth/login-dialog";
import { useAppSelector } from "@/hooks/use-redux";

const Aside = () => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogoutDialog /> : <LoginDialog />}
      {!user && <RegisterDialog />}
    </div>
  );
};

export default Aside;
