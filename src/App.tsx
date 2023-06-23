import "./styles/global.css";
import AppRouter from "./config/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/navigation/Layout";

function App() {
	return (
		<Router>
			<Layout>
				<AppRouter />
			</Layout>
		</Router>
	);
}

export default App;
