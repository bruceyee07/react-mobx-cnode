import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import './style.styl'

class LinkToLoginPage extends Component {
	render () {
		return (
			<div className="link-to-login-page-wrapper">
				您尚未登录，请先<Link to="/login">登录</Link>
			</div>
		)
	}
}

export default LinkToLoginPage