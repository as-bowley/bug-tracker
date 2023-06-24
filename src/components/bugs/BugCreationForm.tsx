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
	Select,
	MenuItem,
	InputLabel,
	SelectChangeEvent,
	AlertColor,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createBug } from "../../redux/actions/bugActions";
import { RootState } from "../../redux/store";

const BugCreationForm = () => {
	const [bugData, setBugData] = useState({
		title: "",
		description: "",
		priority: "low",
		product: "",
	});

	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const dispatch = useDispatch();

	const id = useSelector((state: RootState) => state.auth.id);
	const token = useSelector((state: RootState) => state.auth.token);

	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false });
	};

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | { name?: string; value: unknown }
		>
	) => {
		const { name, value } = event.target;
		setBugData((prevBugData) => ({
			...prevBugData,
			[name as string]: value as string,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const bugDataWithUser = { ...bugData, createdBy: id };
		try {
			const url = "http://localhost:3000/bugs/create";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(bugDataWithUser),
			});

			if (response.ok) {
				dispatch(createBug(bugData));
				setNotification({
					open: true,
					message: "Bug created successfully!",
					severity: "success",
				});
				setBugData({
					title: "",
					description: "",
					priority: "low",
					product: "",
				});
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
				<FormControl fullWidth sx={{ mt: 3 }}>
					<InputLabel id="product-label">Product</InputLabel>
					<Select
						required
						labelId="product-label"
						name="product"
						id="product"
						value={bugData.product}
						label="Product"
						onChange={
							handleChange as (
								event: SelectChangeEvent<string>
							) => void
						}
					>
						<MenuItem value="ios">iOS</MenuItem>
						<MenuItem value="android">Android</MenuItem>
						<MenuItem value="web">Web</MenuItem>
					</Select>
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
				<Alert severity={notification.severity as AlertColor || "info"}>
					{notification.message}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default BugCreationForm;
