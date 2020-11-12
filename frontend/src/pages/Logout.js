import React from 'react';

export default function Logout(props) {
	const onLogout = () => {
		props.logout();
		props.history.push('/');
	};
	return (
		<div>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
}
