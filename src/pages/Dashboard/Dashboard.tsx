import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import BugList from "../../components/bugs/BugList";
import { useSelector } from "react-redux";
import { Box, Toolbar } from "@mui/material";
import { RootState } from "../../redux/store";

const Dashboard: React.FC = () => {
	const [bugs, setBugs] = useState([]);
	const token = useSelector((state: RootState) => state.auth.token);

	useEffect(() => {
		const fetchBugs = async () => {
			try {
				const response = await fetch("http://localhost:3000/bugs/all", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					setBugs(data);
				} else {
					console.error("Error fetching bugs:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching bugs:", error);
			}
		};

		fetchBugs();
	}, [token]);

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar /> 
			<Box sx={{ display: "flex" }}>
				<Box sx={{ flexGrow: 1, p: 2 }}>
					<BugList bugs={bugs} />
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
