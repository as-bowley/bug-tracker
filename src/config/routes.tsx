import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import BugList from "./BugList";
// import BugDetails from "./BugDetails";
// import BugCreate from "./BugCreate";
import UserRegistration from "../components/user/UserRegistration";

const AppRouter = () => {
	return (
		<Routes>
			{/* <Route path="/" exact component={BugList} />
			<Route path="/bugs/:id" component={BugDetails} />
			<Route path="/bugs/create" component={BugCreate} /> */}
			<Route path="/register" element={<UserRegistration />} />
		</Routes>
	);
};

export default AppRouter;
