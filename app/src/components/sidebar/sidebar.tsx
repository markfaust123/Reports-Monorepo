import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { AddReportDialog } from "./add-report-dialog";
import { useAppSelector } from "@/hooks/use-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../util/avatar";

const Sidebar = () => {
  const user = useAppSelector((state) => state.userState.user);
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    user && (
      <div className="flex flex-col gap-2 p-4">
        <Avatar name={user.name} avatarUrl={user.avatarUrl} />
        <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
          <HomeIcon className="w-5 h-5" />
        </Button>
        <Button aria-label={"Search"} variant="ghost" size="sm">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </Button>
        <AddReportDialog />
      </div>
    )
  );
};

export default Sidebar;
