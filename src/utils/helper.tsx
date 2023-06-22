export const checkAuthentication = async () => {
	try {
		const token = localStorage.getItem("token");

		if (!token) {
			console.log("No token found");
			return false;
		}

		const response = await fetch(
			"http://localhost:3000/api/check-authentication",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

		if (response.ok) {
			console.log("User is authenticated");
			return true;
		} else {
			console.log("User is not authenticated");
			return false;
		}
	} catch (error) {
		console.error("Error occurred during authentication check:", error);
		return false;
	}
};

export const handleLogout = () => {
	localStorage.removeItem("token");
};