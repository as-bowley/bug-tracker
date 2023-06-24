import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface Bug {
	id: number;
	title: string;
	description: string;
	product: string;
	priority: string;
	status: string;
	createdBy: { id: number; username: string; displayName: string };
	createdAt: string;
	updatedAt: string;
}

const BugDetails = () => {
	const token = useSelector((state: RootState) => state.auth.token);
	const { id } = useParams();
	const [bug, setBug] = useState<Bug>({
		id: 0,
		title: "",
		description: "",
		product: "",
		priority: "",
		status: "",
		createdBy: { id: 0, username: "", displayName: "" },
		createdAt: "",
		updatedAt: "",
	});

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const fetchBugDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/bugs/${id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const bugData = await response.json();
					setBug(bugData);
				} else {
					console.error("Error fetching bug details");
				}
			} catch (error) {
				console.error("Error fetching bug details", error);
			}
		};

		fetchBugDetails();
	}, [id, token]);

	if (!bug) {
		return (
			<Container maxWidth="md">
				<Typography variant="h4">Loading...</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth="md">
			<Box marginY={2}>
				<Button variant="contained" onClick={handleGoBack}>
					Go Back
				</Button>
			</Box>
			<Typography variant="h4" component="h1" gutterBottom>
				Bug Details
			</Typography>
			<Paper elevation={3} sx={{ padding: "1rem" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Title:</Typography>
						<Typography variant="body1">{bug.title}</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">
							Description:
						</Typography>
						<Typography variant="body1">
							{bug.description}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Priority:</Typography>
						<Typography variant="body1">{bug.priority}</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Status:</Typography>
						<Typography variant="body1">{bug.status}</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Product:</Typography>
						<Typography variant="body1">{bug.product}</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Created By:</Typography>
						<Typography variant="body1">
							{bug?.createdBy?.username}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Created At:</Typography>
						<Typography variant="body1">{bug.createdAt}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1">
							Last Updated:
						</Typography>
						<Typography variant="body1">{bug.updatedAt}</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default BugDetails;
