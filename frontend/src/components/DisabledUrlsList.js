import React, { Component } from 'react';
import DisabledUrl from './DisabledUrl';

class DisabledUrlsList extends Component {
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<td>Original Url</td>
							<td>Short Url</td>
							<td>Clicks</td>
							<td>Activate</td>
							<td>Delete</td>
						</tr>
					</thead>
					<tbody>
						{this.props.urls.map(url => (
							<DisabledUrl
								key={url.urlCode}
								url={url}
								activateUrl={this.props.activateUrl}
								deleteUrl={this.props.deleteUrl}
								id={url._id}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DisabledUrlsList;
