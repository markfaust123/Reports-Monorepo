import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch } from "./hooks/use-redux";
import { useToast } from "./components/ui/use-toast";
import { useEffect } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { clearUser } from "./store/user";
import MainView from "./views/main-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/error-page";
import ReportView from "./views/report-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reports/:reportId",
    element: <ReportView />,
    errorElement: <ErrorPage />,
  },
]);

const Root = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        dispatch(clearUser());
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
