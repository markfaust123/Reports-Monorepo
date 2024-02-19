import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar/sidebar";
import { useAppDispatch } from "@/hooks/use-redux";
import { clearSelectedReportId } from "@/store/reports";
import { useEffect } from "react";

const MainView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSelectedReportId());
  }, []);

  return (
    <>
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default MainView;
