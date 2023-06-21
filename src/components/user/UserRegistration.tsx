import { useState } from "react";
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
	Snackbar,
} from "@mui/material";

export default function UserRegistration() {
	const [formData, setFormData] = useState({
		username: "",
		displayname: "",
		team: "",
		password: "",
	});

	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false });
	};

	const [isRegisterMode, setIsRegisterMode] = useState(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const url = isRegisterMode
				? "http://localhost:3000/users/register"
				: "http://localhost:3000/users/login";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				if (isRegisterMode) {
					setNotification({
						open: true,
						message: "User registered successfully",
						severity: "success",
					});
				} else {
					setNotification({
						open: true,
						message: "User logged in successfully",
						severity: "success",
					});
				}

				setFormData({
					username: "",
					displayname: "",
					team: "",
					password: "",
				});
			} else {
				if (isRegisterMode) {
					setNotification({
						open: true,
						message: "User registration failed",
						severity: "error",
					});
				} else {
					setNotification({
						open: true,
						message: "User login failed",
						severity: "error",
					});
				}
			}
		} catch (error) {
			console.error(
				`Error occurred during ${
					isRegisterMode ? "registration" : "login"
				}`,
				error
			);
		}
	};

	const toggleMode = () => {
		setIsRegisterMode((prevMode) => !prevMode);
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
					{isRegisterMode ? "User Registration" : "User Login"}
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={isRegisterMode ? 6 : 12}>
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
							{isRegisterMode && (
								<TextField
									name="displayname"
									required
									fullWidth
									id="displayname"
									label="Display Name"
									value={formData.displayname}
									onChange={handleChange}
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							{isRegisterMode && (
								<FormControl
									required
									fullWidth
									variant="outlined"
								>
									<InputLabel id="team-label">
										Team
									</InputLabel>
									<Select
										name="team"
										required
										fullWidth
										labelId="team-label"
										id="team"
										label="Team"
										value={formData.team}
										onChange={handleChange}
									>
										<MenuItem value="revenue">
											Revenue
										</MenuItem>
										<MenuItem value="engineering">
											Engineering
										</MenuItem>
									</Select>
								</FormControl>
							)}
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
								sx={{ mt: isRegisterMode ? 3 : 0 }}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{isRegisterMode ? "Sign Up" : "Login"}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="#" variant="body2" onClick={toggleMode}>
								{isRegisterMode
									? "Already have an account? Sign in"
									: "Don't have an account? Sign up"}
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
