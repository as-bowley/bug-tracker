import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	Collapse,
	Divider,
	ListSubheader,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { logout, setToken } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const drawerWidth = 240;

const SideMenu: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openProduct, setOpenProduct] = useState(false);

	const handleClickProduct = () => {
		setOpenProduct(!openProduct);
	};
	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(logout());
		dispatch(setToken(""));
		navigate("/login");
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
						<ListItemText primary="Dashboard" />
					</ListItem>
				</List>

				<Divider />

				<List>
					<ListSubheader>Bug Tracking</ListSubheader>
					<ListItem button component={Link} to="/bugs/create">
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary="Create Bug" />
					</ListItem>
					<ListItem button component={Link} to="/bugs/all">
						<ListItemIcon>
							<BugReportIcon />
						</ListItemIcon>
						<ListItemText primary="All Bugs" />
					</ListItem>
					<ListItem button component={Link} to="/bugs/my">
						<ListItemIcon>
							<BugReportIcon />
						</ListItemIcon>
						<ListItemText primary="My Bugs" />
					</ListItem>
				</List>

				<Divider />

				<List>
					<ListSubheader>Platforms</ListSubheader>
					<ListItem button onClick={handleClickProduct}>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary="Platforms" />
						{openProduct ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse
						in={openProduct}
						timeout="auto"
						unmountOnExit
						sx={{ paddingLeft: 9 }}
					>
						<List component="div" disablePadding>
							<ListItem button component={Link} to="bugs/platforms/ios">
								<ListItemText primary="iOS Bugs" />
							</ListItem>
							<ListItem
								button
								component={Link}
								to="bugs/platforms/android"
							>
								<ListItemText primary="Android Bugs" />
							</ListItem>
							<ListItem button component={Link} to="bugs/platforms/web">
								<ListItemText primary="Web Bugs" />
							</ListItem>
						</List>
					</Collapse>
				</List>
			</Box>

			<Box>
				<Divider />

				<List>
					<ListSubheader>Account</ListSubheader>
					<ListItem button component={Link} to="/user/profile">
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
