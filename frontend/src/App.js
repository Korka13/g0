import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';

import './App.css';
import Links from './pages/Links';
import Trash from './pages/Trash';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Authenticate from './pages/Authenticate';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			user: {},
			urls: []
		};
		this.createNewUrl = this.createNewUrl.bind(this);
		this.modifyUrl = this.modifyUrl.bind(this);
		this.getAllUrls = this.getAllUrls.bind(this);
		this.deleteUrl = this.deleteUrl.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		const token = window.localStorage.getItem('jwt');
		this.getUserData(token);
	}

	getUserData(token) {
		if (token) {
			const url = `${process.env.REACT_APP_SERVER_URL}auth`;
			const h = new Headers();
			h.append('Authentication', `Bearer ${token}`);
			const req = new Request(url, {
				method: 'POST',
				headers: h
			});
			fetch(req).then(res => {
				if (res.status === 200) {
					res
						.json()
						.then(res =>
							this.setState({ user: res, isLoggedIn: true }, () => this.getAllUrls())
						);
				} else {
					console.log('unauthorized user');
				}
			});
		}
	}

	getAllUrls() {
		const url = `${process.env.REACT_APP_SERVER_URL}api/urls`;
		const h = new Headers();
		h.append('Authentication', `Bearer ${this.state.user.token}`);
		const req = new Request(url, {
			method: 'GET',
			headers: h
		});

		fetch(req)
			.then(res => {
				if (res.status === 200) {
					res.json().then(res =>
						this.setState({
							urls: res
						})
					);
				} else {
					console.log('unauthorized user');
				}
			})
			.catch(err => console.log(err));
	}

	createNewUrl(newUrl) {
		const isUrlNew = this.state.urls.every(url => url.longUrl !== newUrl);
		if (newUrl && isUrlNew) {
			const url = `${process.env.REACT_APP_SERVER_URL}api/urls`;
			const h = new Headers();
			h.append('Authentication', `Bearer ${this.state.user.token}`);
			h.append('Content-Type', 'application/json');
			const req = new Request(url, {
				method: 'POST',
				headers: h,
				body: JSON.stringify({
					longUrl: newUrl
				})
			});

			fetch(req)
				.then(res => res.json())
				.then(res => this.setState({ urls: [...this.state.urls, res] }))
				.catch(err => console.log(err));
		} else {
			this.setState({
				urls: this.state.urls.map(url => {
					if (url.longUrl === newUrl) {
						return { ...url, isGreen: true };
					} else {
						return url;
					}
				})
			});
		}
	}

	modifyUrl(id, active) {
		const url = `${process.env.REACT_APP_SERVER_URL}api/urls`;
		const h = new Headers();
		h.append('Authentication', `Bearer ${this.state.user.token}`);
		h.append('Content-Type', 'application/json');
		const req = new Request(url, {
			method: 'PUT',
			headers: h,
			body: JSON.stringify({
				id: id,
				active: active
			})
		});

		fetch(req)
			.then(res => res.json())
			.then(res =>
				this.setState({
					urls: res
				})
			)
			.catch(err => console.log(err));
	}

	deleteUrl(id) {
		const url = `${process.env.REACT_APP_SERVER_URL}api/urls`;
		const h = new Headers();
		h.append('Authentication', `Bearer ${this.state.user.token}`);
		h.append('Content-Type', 'application/json');
		const req = new Request(url, {
			method: 'DELETE',
			headers: h,
			body: JSON.stringify({
				id: id
			})
		});
		fetch(req)
			.then(res => res.json())
			.then(res =>
				this.setState({
					urls: res
				})
			)
			.catch(err => console.log(err));
	}

	logout() {
		const url = `${process.env.REACT_APP_SERVER_URL}auth/logout`;
		const h = new Headers();
		h.append('Authentication', `Bearer ${this.state.user.token}`);
		const req = new Request(url, {
			method: 'POST',
			headers: h
		});
		fetch(req).then(res => {
			if (res.status === 200) {
				res
					.json()
					.then(res => console.log(res))
					.then(() => {
						this.setState({ user: {}, isLoggedIn: false, urls: [] }, () => {
							localStorage.removeItem('jwt');
						});
					})
					.catch(err => console.log(err));
			} else {
				console.log('could not logout the user');
			}
		});
	}

	render() {
		return (
			<BrowserRouter>
				<Navbar isLoggedIn={this.state.isLoggedIn} />

				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/login" component={Login} exact />
					<Route
						path="/authenticated/:token"
						render={props => <Authenticate {...props} />}
						exact
					/>

					<Route
						path="/links"
						exact
						render={() => (
							<Links
								urls={this.state.urls.filter(url => url.active === true)}
								createNewUrl={this.createNewUrl}
								modifyUrl={this.modifyUrl}
							/>
						)}
					/>
					<Route
						path="/trash"
						exact
						render={() => (
							<Trash
								urls={this.state.urls.filter(url => url.active === false)}
								modifyUrl={this.modifyUrl}
								deleteUrl={this.deleteUrl}
							/>
						)}
					/>

					<Route
						path="/logout"
						render={props => <Logout {...props} logout={this.logout} />}
						exact
					/>

					<Route render={() => <h1>Page not found</h1>} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
