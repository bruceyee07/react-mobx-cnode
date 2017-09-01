import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import DeliverPage from '../components/DeliverPage'
import TopicContent from '../components/TopicContent'
import UserCenter from '../components/UserCenter'
import AccountInfo from '../components/AccountInfo'
import LoginPage from '../components/LoginPage'
import './style.styl'

export default class Root extends React.Component {
	render () {
		const { store } = this.props
		
		return (
			<HashRouter>
				<div className="wrapper">
					<Route path="/" exact render={(routes) => <HomePage store={store} routes={routes} />} />
					<Route path="/deliver" exact render={(routes) => <DeliverPage store={store} routes={routes} />} />
					<Route path="/topic/:id" exact render={(routes) => <TopicContent store={store} routes={routes} />} />
					<Route path="/user/:userName" exact render={(routes) => <UserCenter store={store} routes={routes} />} />
					<Route path="/account" exact render={(routes) => <AccountInfo store={store} routes={routes} />} />
					<Route path="/login" exact render={(routes) => <LoginPage store={store} routes={routes} />} />
				</div>
			</HashRouter>
		)
	}
}