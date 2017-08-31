import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import './style.styl'

export default class Root extends React.Component {
	render () {
		const { store } = this.props
		
		return (
			<HashRouter>
				<div className="wrapper">
					<Route path="/" exact render={() => <HomePage store={store} />} />
				</div>
			</HashRouter>
		)
	}
}