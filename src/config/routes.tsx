import {
	Route,
	Routes,
	useRoutes,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "../components/common/PrivateRoute";
import { CircularProgress } from "@mui/material";

const Login = lazy(() => import("../pages/Login/Login"));
const BugCreation = lazy(() => import("../pages/Bugs/BugCreate/BugCreate"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Register = lazy(() => import("../pages/Register/Register"));
const BugDetails = lazy(() => import("../pages/Bugs/BugDetails/BugDetails"));
const BugsAll = lazy(() => import("../pages/Bugs/Bugs"));
const AndroidBugs = lazy(() => import("../pages/Bugs/Platforms/Android"));
const IosBugs = lazy(() => import("../pages/Bugs/Platforms/Ios"));
const WebBugs = lazy(() => import("../pages/Bugs/Platforms/Web"));
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
						<Route path="all" element={<BugsAll />} />,
						<Route path=":id" element={<BugDetails />} />,
						<Route path="platforms">
							<Route path="android" element={<AndroidBugs />} />
							<Route path="ios" element={<IosBugs />} />
							<Route path="web" element={<WebBugs />} />
						</Route>
					</Routes>
				</PrivateRoute>
			),
		},
		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> },
		{ path: "/user/profile", element: <UserProfile /> },
		{
			path: "*",
			element: (
				<div>
					<h2>Page not found</h2>
				</div>
			),
		},
	]);

	return <Suspense fallback={<CircularProgress />}>{element}</Suspense>;
};

export default AppRouter;
