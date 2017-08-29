import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'

import './style.styl'

export default class Root extends React.Component {
	render () {
		return (
			<HashRouter>
				<div className="wrapper">
					<Route path="/" exact component={HomePage} />
				</div>
			</HashRouter>
		)
	}
}