import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // adjust this path according to your directory structure
import { logout } from "../redux/actions/authActions";

const Navbar: React.FC = () => {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	const [navLinks, setNavLinks] = useState([
		{ title: "Login/Register", path: "/login" },
	]);

	useEffect(() => {
		if (isAuthenticated) {
			setNavLinks([
				{ title: "Logout", path: "/login", onClick: handleLogout },
				{ title: "Create", path: "/bugs/create" },
			]);
		} else {
			setNavLinks([{ title: "Login/Register", path: "/login" }]);
		}
	}, [isAuthenticated]);

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(logout());
		localStorage.removeItem("token");
	};

	return (
		<div className="navbar">
			<div className="nav__title">
				<Link to="/">
					<h1>Bug Tracker</h1>
				</Link>
			</div>
			<ul className="nav__links">
				{navLinks.map((link, index) => (
					<li key={index} className="nav__item">
						<Link
							className="nav__item-link"
							to={link.path}
							onClick={link.onClick}
						>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navbar;
