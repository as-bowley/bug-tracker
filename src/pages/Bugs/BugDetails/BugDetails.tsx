import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Container,
	Typography,
	Grid,
	Paper,
	Button,
	Box,
	TextField,
	FormControl,
	Select,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	Radio,
	SelectChangeEvent,
	CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { deleteBug, fetchBugDetails, updateBug } from "../../../redux/thunks/bugThunks";
import { RootState } from "../../../redux/types";
import { Bug } from "../../../redux/types/bugTypes";


const BugDetails = () => {
	const dispatch: AppDispatch = useDispatch<AppDispatch>();
	const { bug, loading, error } = useSelector(
		(state: RootState) => state.bug
	);
	const [updatedBug, setUpdatedBug] = useState<Bug>({});
	const token = useSelector((state: RootState) => state.auth.token);
	const { id } = useParams<{ id: string | undefined }>();
	const navigate = useNavigate();

	const [editing, setEditing] = useState(false);
	useEffect(() => {
		if (token && id) {
			dispatch(fetchBugDetails(id, token));
		}
	}, [dispatch, id, token]);

	useEffect(() => {
		if (bug) {
			setUpdatedBug(bug);
		}
	}, [bug])

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleEdit = () => {
		setEditing(true);
		setUpdatedBug(bug);
	};

	const handleChange = (
		event: React.ChangeEvent<
			| HTMLInputElement
			| HTMLTextAreaElement
			| { name?: string; value: unknown }
		>
	) => {
		const { name, value } = event.target;
		setUpdatedBug((prevBug) => {
			if (prevBug) {
				return {
					...prevBug,
					[name as string]: value,
				};
			} else {
				return null;
			}
		});
	};

	const handleSave = () => {
		if (token && id && updatedBug) {
			dispatch(updateBug(id, token, updatedBug));
		}
		setEditing(false);
	};

	const handleDelete = () => {
		if (token && id) {
			dispatch(deleteBug(id, token));
			navigate(-1);
		}
	};

	if (loading) {
		return (
			<Container maxWidth="md">
				<CircularProgress />
			</Container>
		);
	}

	if (error) {
		return (
			<Container maxWidth="md">
				<Typography variant="h4" component="h1" gutterBottom>
					Error occurred while fetching bug details: {error}
				</Typography>
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
						{editing ? (
							<TextField
								name="title"
								value={updatedBug?.title || ""}
								onChange={handleChange}
								fullWidth
							/>
						) : (
							<Typography variant="body1">
								{bug?.title || ""}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">
							Description:
						</Typography>
						{editing ? (
							<TextField
								name="description"
								value={updatedBug?.description || ""}
								onChange={handleChange}
								multiline
								rows={4}
								fullWidth
							/>
						) : (
							<Typography variant="body1">
								{bug?.description || ""}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Priority:</Typography>
						{editing ? (
							<FormControl fullWidth>
								<Select
									name="priority"
									value={updatedBug?.priority || ""}
									onChange={
										handleChange as (
											event: SelectChangeEvent<string>
										) => void
									}
								>
									<MenuItem value="low">Low</MenuItem>
									<MenuItem value="medium">Medium</MenuItem>
									<MenuItem value="high">High</MenuItem>
									<MenuItem value="critical">
										Critical
									</MenuItem>
								</Select>
							</FormControl>
						) : (
							<Typography variant="body1">
								{bug?.priority || ""}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Status:</Typography>
						{editing ? (
							<FormControl component="fieldset">
								<RadioGroup
									name="status"
									value={updatedBug?.status || ""}
									onChange={handleChange}
								>
									<FormControlLabel
										value="Open"
										control={<Radio />}
										label="Open"
									/>
									<FormControlLabel
										value="In Progress"
										control={<Radio />}
										label="In Progress"
									/>
									<FormControlLabel
										value="Resolved"
										control={<Radio />}
										label="Resolved"
									/>
								</RadioGroup>
							</FormControl>
						) : (
							<Typography variant="body1">
								{bug?.status || ""}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Product:</Typography>
						{editing ? (
							<FormControl fullWidth>
								<Select
									name="product"
									value={updatedBug?.product || ""}
									onChange={
										handleChange as (
											event: SelectChangeEvent<string>
										) => void
									}
								>
									<MenuItem value="android">Android</MenuItem>
									<MenuItem value="ios">iOS</MenuItem>
									<MenuItem value="web">Web</MenuItem>
								</Select>
							</FormControl>
						) : (
							<Typography variant="body1">
								{bug?.product || ""}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Created By:</Typography>
						<Typography variant="body1">
							{bug?.createdBy?.username}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="subtitle1">Created At:</Typography>
						<Typography variant="body1">
							{bug?.createdAt || ""}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1">
							Last Updated:
						</Typography>
						<Typography variant="body1">
							{bug?.updatedAt || ""}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						{editing ? (
							<>
								<Button
									variant="contained"
									color="primary"
									onClick={handleSave}
								>
									Save
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={handleDelete}
									style={{ marginLeft: "1rem" }}
								>
									Delete
								</Button>
							</>
						) : (
							<Button variant="contained" onClick={handleEdit}>
								Edit
							</Button>
						)}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default BugDetails;
