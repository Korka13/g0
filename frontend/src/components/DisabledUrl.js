import React, { Component } from 'react';

class Url extends Component {
	constructor(props) {
		super(props);
		this.activateUrl = this.activateUrl.bind(this);
		this.deleteUrl = this.deleteUrl.bind(this);
	}
	activateUrl() {
		this.props.activateUrl(this.props.id, true);
	}
	deleteUrl() {
		this.props.deleteUrl(this.props.id);
	}

	render() {
		const { url } = this.props;
		return (
			<tr>
				<td style={url.isGreen ? { backgroundColor: 'green' } : null}>
					{url.longUrl.length > 50
						? url.longUrl.substring(0, 50) + '...'
						: url.longUrl}
				</td>
				<td>{url.shortUrl}</td>
				<td>{url.clicks}</td>
				<td>
					<button onClick={this.activateUrl}>Activate</button>
				</td>
				<td>
					<button onClick={this.deleteUrl}>Delete</button>
				</td>
			</tr>
		);
	}
}

export default Url;
