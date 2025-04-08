import React, { FC } from "react";
import { getToken } from "../../utils/auth";
import * as jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  component: React.ComponentType;
}

interface JwtPayload {
  role: string;
}

const AdminRoute: FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
  const token = getToken();
  let isAdmin = false;

  if (token) {
    const decoded: JwtPayload = jwt_decode.jwtDecode(token);
    isAdmin = decoded.role === "admin";
  }

  return token && isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
