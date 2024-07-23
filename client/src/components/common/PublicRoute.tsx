import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const PublicRoute: React.FC = () => {
  const { user } = useUserContext();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
