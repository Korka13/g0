import React from 'react';

export default function Input({ inputUrl, onInputChange, onSubmit }) {
	return (
		<div>
			<input value={inputUrl} type="text" onChange={onInputChange} />
			<button onClick={onSubmit}>Submit</button>
		</div>
	);
}
