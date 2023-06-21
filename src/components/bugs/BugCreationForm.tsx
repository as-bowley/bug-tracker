import { useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	Snackbar,
	Alert,
} from "@mui/material";

const BugCreationForm = () => {
	const [bugData, setBugData] = useState({
		title: "",
		description: "",
		priority: "low",
	});

	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBugData({ ...bugData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/bugs/create";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bugData),
			});

			if (response.ok) {
				setNotification({
					open: true,
					message: "Bug created successfully!",
					severity: "success",
				});
				setBugData({ title: "", description: "", priority: "low" });
			}
		} catch (error) {
			console.error(error);
			setNotification({
				open: true,
				message: "Something went wrong!",
				severity: "error",
			});
		}
	};

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" align="center">
				Bug Creation
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					name="title"
					label="Title"
					value={bugData.title}
					onChange={handleChange}
					fullWidth
					required
					margin="normal"
				/>
				<TextField
					name="description"
					label="Description"
					value={bugData.description}
					onChange={handleChange}
					multiline
					rows={4}
					fullWidth
					required
					margin="normal"
				/>
				<FormControl component="fieldset" fullWidth>
					<Typography variant="subtitle1">Priority</Typography>
					<RadioGroup
						row
						aria-labelledby="priority-label"
						name="priority"
						value={bugData.priority}
						onChange={handleChange}
					>
						<FormControlLabel
							value="low"
							control={<Radio />}
							label="Low"
						/>
						<FormControlLabel
							value="medium"
							control={<Radio />}
							label="Medium"
						/>
						<FormControlLabel
							value="high"
							control={<Radio />}
							label="High"
						/>
						<FormControlLabel
							value="critical"
							control={<Radio />}
							label="Critical"
						/>
					</RadioGroup>
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
				>
					Create Bug
				</Button>
			</form>
			<Snackbar
				open={notification.open}
				onClose={handleCloseNotification}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={notification.severity}>
					{notification.message}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default BugCreationForm;
