import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'
import './style.styl'

@observer
class LoginPage extends Component {
	constructor (props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit () {
		const { store } = this.props
		const token = this.refs['token-input'].value

		store.requestLogin(token, () => {
			this.props.routes.history.goBack()
		})
		this.refs['submit-btn'].disabled = true
	}
	render () {
		return (
			<div className="login-page-wrapper">
				<div className="login-box">
					<div><input ref="token-input" className="token-input" type="password" placeholder="请输入您的access token" /></div>
					<div><button ref="submit-btn" type="submit" className="submit-btn" onClick={() => {
						this.handleSubmit()
					}}>提交</button></div>
				</div>
			</div>
		)
	}
}

export default LoginPage