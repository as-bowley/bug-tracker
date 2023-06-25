import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
	Typography,
	Grid,
	Box,
	TextField,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
	InputLabel,
} from "@mui/material";

interface User {
	username: string;
	displayname: string;
	team: string;
}

const Profile: React.FC = () => {
	const token = useSelector((state: RootState) => state.auth.token);
	const userId = useSelector((state: RootState) => state.auth.id);

	const [user, setUser] = useState<User>({
		username: "",
		displayname: "",
		team: "",
	});
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await fetch(
					`http://bug-tracker-backend-gold.vercel.app/users/profile/${userId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const userData = await response.json();
					setUser(userData);
				}
			} catch (error) {
				console.error("Error fetching user profile", error);
			}
		};

		fetchUserProfile();
	}, [token, userId]);

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSave = async () => {
		const displayname = user.displayname;
		try {
			const response = await fetch(
				`http://bug-tracker-backend-gold.vercel.app/users/profile/${userId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ displayname, team: user.team }),
				}
			);
			if (response.ok) {
				setEditing(false);
				setUser((prevUser) => ({ ...prevUser, displayname }));
			}
		} catch (error) {
			console.error("Error updating user profile", error);
		}
	};

	const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setUser({ ...user, team: event.target.value as string });
	};

	return (
		<Box
			display="flex"
			flexDirection={{ xs: "column", sm: "row" }}
			justifyContent="center"
			alignItems="center"
			minHeight="100%"
		>
			<Box p={4} bgcolor="white" borderRadius={8}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h3">{user.username}</Typography>
					</Grid>
					<Grid item xs={12}>
						{editing ? (
							<TextField
								label="Display Name"
								value={user.displayname}
								onChange={(e) =>
									setUser({
										...user,
										displayname: e.target.value,
									})
								}
								fullWidth
							/>
						) : (
							<Grid item xs={12}>
								<Typography variant="h5">
									{user.displayname}
								</Typography>
							</Grid>
						)}
					</Grid>
					<Grid item xs={12}>
						{editing ? (
							<>
								<InputLabel id="team-label">Team</InputLabel>
								<Select
									label="Team"
									value={user.team}
									onChange={
										handleTeamChange as (
											event: SelectChangeEvent<string>
										) => void
									}
									fullWidth
								>
									<MenuItem value="revenue">Revenue</MenuItem>
									<MenuItem value="engineering">
										Engineering
									</MenuItem>
								</Select>
							</>
						) : (
							<Typography variant="subtitle1">
								Team:{" "}
								{user.team.charAt(0).toUpperCase() +
									user.team.slice(1)}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12}>
						{editing ? (
							<Button
								variant="contained"
								color="primary"
								onClick={handleSave}
							>
								Save
							</Button>
						) : (
							<Button variant="contained" onClick={handleEdit}>
								Edit
							</Button>
						)}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Profile;
