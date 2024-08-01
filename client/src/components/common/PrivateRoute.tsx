import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const PrivateRoute: React.FC = () => {
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
