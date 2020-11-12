import React, { Component } from 'react';
import Url from './Url';

class UrlsList extends Component {
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<td>Original Url</td>
							<td>Short Url</td>
							<td>Clicks</td>
							<td>Delete</td>
						</tr>
					</thead>
					<tbody>
						{this.props.urls.map(url => (
							<Url
								key={url.urlCode}
								url={url}
								deactivateUrl={this.props.deactivateUrl}
								id={url._id}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default UrlsList;
