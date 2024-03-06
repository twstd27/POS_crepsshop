import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";
import backgroundImage from "../assets/fondo2.jfif";

export const AuthLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "Pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "Authenticated") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div
        className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-indigo-700"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};
