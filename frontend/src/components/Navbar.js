import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

export default function Navbar(props) {
	return (
		<div className="Navbar">
			<NavLink className="home" to="/">
				Home
			</NavLink>
			{props.isLoggedIn ? (
				<>
					<NavLink to="/links">Create/View Links</NavLink>
					<NavLink to="/trash">Trash Bin</NavLink>
					<NavLink to="/logout">Logout</NavLink>
				</>
			) : (
				<NavLink to="/login">Login</NavLink>
			)}
		</div>
	);
}
