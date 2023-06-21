import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import BugList from "./BugList";
// import BugDetails from "./BugDetails";
// import BugCreate from "./BugCreate";
import Login from "../pages/Login";
import BugCreation from "../pages/BugCreation";

const AppRouter = () => {
	return (
		<Routes>
			{/* <Route path="/" exact component={BugList} />
			<Route path="/bugs/:id" component={BugDetails} /> */}
			<Route path="/bugs/create" element={<BugCreation />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default AppRouter;
