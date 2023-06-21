import AppRouter from "./config/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<AppRouter />
		</Router>
	);
}

export default App;
