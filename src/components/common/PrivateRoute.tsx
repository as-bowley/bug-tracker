import React, { ReactNode, useEffect } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

type PrivateRouteProps = {
	children: ReactNode;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}


	return children;
};

export default PrivateRoute;
