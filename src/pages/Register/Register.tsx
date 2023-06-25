import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setToken } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	Alert,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Snackbar,
} from "@mui/material";

type Notification = {
	open: boolean;
	message: string;
	severity: "success" | "error";
};

export default function Register() {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		username: "",
		displayname: "",
		team: "",
		password: "",
	});
	const [notification, setNotification] = useState<Notification>({
		open: false,
		message: "",
		severity: "success",
	});
	const navigate = useNavigate();

	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false });
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const url =
				"http://bug-tracker-backend-gold.vercel.app/users/register";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(setToken(data.token));
				dispatch(loginSuccess(data.token));
				dispatch({ type: "SET_USER_ID", payload: data.id });
				setTimeout(() => {
					navigate("/dashboard");
				}, 2000);

				setNotification({
					open: true,
					message: "User registered successfully",
					severity: "success",
				});

				setFormData({
					username: "",
					displayname: "",
					team: "",
					password: "",
				});
			} else {
				setNotification({
					open: true,
					message: "User registration failed",
					severity: "error",
				});
			}
		} catch (error) {
			console.error("Error occurred during registration", error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					User Registration
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="username"
								required
								fullWidth
								id="username"
								label="Username"
								autoFocus
								value={formData.username}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="displayname"
								required
								fullWidth
								id="displayname"
								label="Display Name"
								value={formData.displayname}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl required fullWidth variant="outlined">
								<InputLabel id="team-label">Team</InputLabel>
								<Select
									name="team"
									required
									fullWidth
									labelId="team-label"
									id="team"
									label="Team"
									value={formData.team}
									onChange={
										handleChange as (
											event: SelectChangeEvent<string>
										) => void
									}
								>
									<MenuItem value="revenue">Revenue</MenuItem>
									<MenuItem value="engineering">
										Engineering
									</MenuItem>
								</Select>
							</FormControl>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								value={formData.password}
								onChange={handleChange}
								sx={{ mt: 3 }}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Snackbar
				open={notification.open}
				onClose={handleCloseNotification}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					severity={notification.severity}
					onClose={handleCloseNotification}
				>
					{notification.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}
