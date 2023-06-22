import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import BugList from "./BugList";
// import BugDetails from "./BugDetails";
// import BugCreate from "./BugCreate";
import Login from "../pages/Login";
import BugCreation from "../pages/BugCreation";
import PrivateRoute from "../components/common/PrivateRoute";
import Test from "../components/auth/Login";

const AppRouter = () => {

	return (
		<Routes>
			{/* <Route path="/" exact component={BugList} />
			<Route path="/bugs/:id" component={BugDetails} /> */}
			<Route
				path="/bugs/create"
				element={
					<PrivateRoute>
						<BugCreation />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/test" element={<Test />} />
		</Routes>
	);
};

export default AppRouter;
