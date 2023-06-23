import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	Collapse,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const drawerWidth = 240;

const SideMenu: React.FC = () => {
	const dispatch = useDispatch();
	const [openProduct, setOpenProduct] = useState(false);

	const handleClickProduct = () => {
		setOpenProduct(!openProduct);
	};
	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(logout());
		localStorage.removeItem("token");
	};

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				},
			}}
		>
			<Box>
				<List>
					<ListItem button component={Link} to="/dashboard">
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Overview" />
					</ListItem>
					<ListItem button component={Link} to="/bugs">
						<ListItemIcon>
							<BugReportIcon />
						</ListItemIcon>
						<ListItemText primary="Bugs" />
					</ListItem>
					<ListItem button component={Link} to="/search">
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText primary="Search" />
					</ListItem>
					<ListItem button component={Link} to="/team">
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText primary="Team" />
					</ListItem>
					<ListItem button onClick={handleClickProduct}>
						<ListItemIcon>
							<ShoppingBagIcon />
						</ListItemIcon>
						<ListItemText primary="Product" />
						{openProduct ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse
						in={openProduct}
						timeout="auto"
						unmountOnExit
						sx={{ paddingLeft: 9 }}
					>
						<List component="div" disablePadding>
							<ListItem button component={Link} to="/product/ios">
								<ListItemText primary="iOS" />
							</ListItem>
							<ListItem
								button
								component={Link}
								to="/product/android"
							>
								<ListItemText primary="Android" />
							</ListItem>
							<ListItem button component={Link} to="/product/web">
								<ListItemText primary="Web" />
							</ListItem>
						</List>
					</Collapse>
				</List>
			</Box>
			<Box>
				<List>
					<ListItem button component={Link} to="/profile">
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem>
					<ListItem button onClick={handleLogout}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default SideMenu;
