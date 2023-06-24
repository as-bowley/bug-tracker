import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginPage";
import BugCreation from "../pages/BugCreatePage";
import PrivateRoute from "../components/common/PrivateRoute";
import Dashboard from "../pages/DashboardPage";
import Register from "../components/user/Register";
import BugDetails from "../components/bugs/BugDetails";
import UserProfile from "../components/user/Profile";

const AppRouter = () => {

	return (
		<Routes>
			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path="/bugs/create"
				element={
					<PrivateRoute>
						<BugCreation />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/user/profile" element={<UserProfile />} />
			<Route path="/bugs/:id" element={<BugDetails />} />
		</Routes>
	);
};

export default AppRouter;
