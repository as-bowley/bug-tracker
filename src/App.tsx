import './styles/global.css';
import Navbar from "./components/Navbar";
import AppRouter from "./config/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<Navbar />
			<AppRouter />
		</Router>
	);
}

export default App;
