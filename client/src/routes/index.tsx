import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";
import PublicRoute from "../components/common/PublicRoute";
import ConceptExplorer from "../components/ConceptExplorer/ConceptExplorer";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));
const AuthSuccess = lazy(() => import("../components/auth/AuthSuccess"));
const AuthError = lazy(() => import("../components/auth/AuthError"));

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<LoadingSpinner size={60} />}>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<ConceptExplorer />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/auth-error" element={<AuthError />} />
      </Route>
    </Routes>
  </Suspense>
);
