import React, { Component } from 'react';

import DisabledUrlsList from '../components/DisabledUrlsList';

export class Trash extends Component {
	render() {
		return (
			<div className="Trash">
				<h1>Trash</h1>
				<DisabledUrlsList
					urls={this.props.urls}
					activateUrl={this.props.modifyUrl}
					deleteUrl={this.props.deleteUrl}
				/>
			</div>
		);
	}
}

export default Trash;
