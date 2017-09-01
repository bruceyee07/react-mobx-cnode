import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'
import LinkToLoginPage from '../LinkToLoginPage'
import Footer from '../Footer'
import { prettyDate, storeToken, deleteToken } from '../../utils'
import { ACCOUNT_TABS as TABS } from '../../consts'
import style from './style.styl'

@observer
class AccountInfo extends Component {
	constructor (props) {
		super(props)

		this.state = {
			currentTab: 'recent_topics'
		}

		this.handleLogout = this.handleLogout.bind(this)
		this.handleClickTab = this.handleClickTab.bind(this)
	}
	componentDidMount () {
		const { store, routes } = this.props
		const accountInfo = storeToken('accountInfo')

		if (accountInfo) {
			store.fetchUserInfo(JSON.parse(accountInfo).loginname)
		}
	}
	handleLogout () {
		const { store, routes } = this.props

		store.logout(() => {
			this.forceUpdate()
		})
	}
	handleClickTab (code) {
		this.setState({
			currentTab: code
		})
	}
	render () {
		const { store } = this.props
		const accountInfo = storeToken('accountInfo')

		if (!storeToken('accountInfo')) {
			return (
				<div className="account-info-wrapper">
			  	<LinkToLoginPage />
			  </div>
			)
		}

		return (
		  <div className="account-info-wrapper">
		  	<div className="account-header">
		  		个人中心
	  			<FontAwesome
	  				className="sign-out-btn"
		        name='sign-out'
		        size='2x'
		        onClick={this.handleLogout}
		      />
		  	</div>
		  	<div className="account-info">
		  		<img className="account-avatar" src={(store.userInfo || {}).avatar_url} />
		  		<p className="account-name">{accountInfo.loginname}</p>
		  		<ul className="basic-info">
		  			<li>注册于：{prettyDate((store.userInfo || {}).create_at)}</li>
		  			<li>积分：{(store.userInfo || {}).score}</li>
		  		</ul>
		  	</div>
		  	<div className="account-topic-wrapper">
		  		<div className="account-topic-header">
		  			<ul className="account-topic-tabs">
		  				{
		  					TABS.map(item => 
		  						<li 
		  							key={item.code} 
		  							className={cx('account-topic-tab', { active: item.code == this.state.currentTab })}
		  							onClick={() => this.handleClickTab(item.code)}
	  							>
	  								{item.name}
	  							</li>
	  						)
		  				}
		  			</ul>
		  		</div>
		  		<div className="account-topic-content">
		  			{(() => {
		  				return ((store.userInfo || {})[this.state.currentTab] || []).length > 0 ? 
				  			<ul className="account-topic-list">
				  				{((store.userInfo || {})[this.state.currentTab] || []).map(item => 
				  					<li key={item.id} className="list-item">
				  						<Link to={`/topic/${item.id}`}>{item.title}</Link>
				  						<span className="last-reply-at">{prettyDate(item.last_reply_at)}</span>
			  						</li>
			  					)}
				  			</ul> :
				  			<div className="empty">暂无数据</div>
		  			})()}
		  		</div>
		  	</div>
		  	<Footer store={store} />
		  </div>
		)
	}
}

export default AccountInfo