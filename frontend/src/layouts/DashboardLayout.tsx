import { SideNavbar } from "../components";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";

export const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "Pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "Unauthenticated") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideNavbar />

        <div className="md:w-4/5 w-full p-4 md:ml-60 ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
