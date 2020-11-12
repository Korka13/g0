import React, { Component } from 'react';

class Url extends Component {
	constructor(props) {
		super(props);
		this.deactivateUrl = this.deactivateUrl.bind(this);
	}
	deactivateUrl() {
		this.props.deactivateUrl(this.props.id, false);
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
					<button onClick={this.deactivateUrl}>Deactivate</button>
				</td>
			</tr>
		);
	}
}

export default Url;
