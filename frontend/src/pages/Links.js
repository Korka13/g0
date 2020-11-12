import React, { Component } from 'react';
import Input from '../components/Input';

import ActiveUrlsList from '../components/ActiveUrlsList';

export class Links extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputUrl: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChange(e) {
		this.setState({ inputUrl: e.target.value });
	}

	onSubmit() {
		this.props.createNewUrl(this.state.inputUrl);
		this.setState({ inputUrl: '' });
	}

	render() {
		return (
			<div className="Links">
				<h1>Url Shortener</h1>
				<Input
					inputUrl={this.state.inputUrl}
					onInputChange={this.onInputChange}
					onSubmit={this.onSubmit}
				/>
				<ActiveUrlsList
					urls={this.props.urls}
					deactivateUrl={this.props.modifyUrl}
				/>
			</div>
		);
	}
}

export default Links;
