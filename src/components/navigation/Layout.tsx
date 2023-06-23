import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return (
		<Box sx={{ display: "flex", flexDirection: isAuthenticated ? "row" : "column" }}>
			{isAuthenticated ? <SideMenu /> : <Navbar />}
			{children}
		</Box>
	);
};

export default Layout;
