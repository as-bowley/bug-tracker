import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import BugList from "../../components/bugs/BugList";
import { useDispatch, useSelector } from "react-redux";
import { Box, Toolbar } from "@mui/material";
import { RootState } from "../../redux/types";
import { fetchAllBugs } from "../../redux/thunks/bugThunks";
import { Bug } from "../../redux/types/bugTypes";

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const [bugs, setBugs] = useState<Bug[]>([]);
	const token = useSelector((state: RootState) => state.auth.token);
	const bugState = useSelector((state: RootState) => state.bug);

	useEffect(() => {
		dispatch(fetchAllBugs(token));
	}, [dispatch, token]);

	useEffect(() => {
		setBugs(bugState.bugs);
	}, [bugState.bugs]);

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Box sx={{ display: "flex" }}>
				<Box sx={{ flexGrow: 1, p: 2 }}>
					<BugList bugs={bugs} limit={10} />
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
