import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Authenticate extends Component {
	componentDidMount() {
		window.localStorage.setItem('jwt', this.props.match.params.token);
		this.props.history.push('/links');
	}
	render() {
		return <div></div>;
	}
}

export default withRouter(Authenticate);
