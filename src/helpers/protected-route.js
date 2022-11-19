import { Navigate, Outlet } from "react-router-dom";
import { useGlobalStore } from "store";

const ProtectedRoute = () => {
  const { userLoggedIn } = useGlobalStore();
  return userLoggedIn.user_id ? <Outlet /> : <Navigate to="/authentication/sign-in" replace />;
};

export default ProtectedRoute;
