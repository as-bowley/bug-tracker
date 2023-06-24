import {
	BrowserRouter as Router,
	Route,
	Routes,
	useRoutes,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "../components/common/PrivateRoute";
import { CircularProgress } from "@mui/material";

const Login = lazy(() => import("../pages/Login/Login"));
const BugCreation = lazy(() => import("../pages/BugCreate/BugCreate"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Register = lazy(() => import("../pages/Register/Register"));
const BugDetails = lazy(() => import("../pages/BugDetails/BugDetails"));
const UserProfile = lazy(() => import("../pages/Profile/Profile"));

const AppRouter = () => {
	const element = useRoutes([
		{ path: "/", element: <Dashboard /> },
		{
			path: "/dashboard",
			element: (
				<PrivateRoute>
					<Dashboard />
				</PrivateRoute>
			),
		},
		{
			path: "/bugs/*",
			element: (
				<PrivateRoute>
					<Routes>
						<Route path="create" element={<BugCreation />} />,
						<Route path=":id" element={<BugDetails />} />,
					</Routes>
				</PrivateRoute>
			),
		},
		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> },
		{ path: "/user/profile", element: <UserProfile /> },
		{ path: "*", element: <div><h2>Page not found</h2></div> }
	]);

	return <Suspense fallback={<CircularProgress />}>{element}</Suspense>;
};

export default AppRouter;
