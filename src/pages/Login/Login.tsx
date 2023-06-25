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
import { Alert, Snackbar } from "@mui/material";

type Notification = {
	open: boolean;
	message: string;
	severity: "success" | "error";
};

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		username: "",
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
				"https://www.bug-tracker-backend-eta.vercel.app/users/login";
			const response = await fetch(url, {
				method: "POST",
				credentials: "include",
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
				navigate("/dashboard");

				setNotification({
					open: true,
					message: "User logged in successfully",
					severity: "success",
				});

				setFormData({
					username: "",
					password: "",
				});
			} else {
				setNotification({
					open: true,
					message: "User login failed",
					severity: "error",
				});
			}
		} catch (error) {
			console.error("Error occurred during login", error);
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
					User Login
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
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
						<Grid item xs={12}>
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
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/register" variant="body2">
								Don't have an account? Sign up
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

export default Login;