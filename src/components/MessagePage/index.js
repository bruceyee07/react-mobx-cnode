import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 
import PropTypes from 'prop-types'
import cx from 'classnames'
import LinkToLoginPage from '../LinkToLoginPage'
import Footer from '../Footer'
import { fetchUserInfo, fetchMessages, fetchUnreadMessagesCount } from '../../actions'
import { prettyDate } from '../../utils'
import style from './style.styl'

const TABS = [
	{
		code: 'hasnot_read_messages',
		name: '未读'
	},
	{
		code: 'has_read_messages',
		name: '已读'
	}
]

class MessagePage extends Component {
	constructor (props) {
		super(props)

		this.state = {
			currentTab: 'hasnot_read_messages'
		}

		this.handleClickTab = this.handleClickTab.bind(this)
	}
	componentDidMount () {
		const { dispatch, accountInfo } = this.props

		dispatch(fetchUnreadMessagesCount(accountInfo.token))
		dispatch(fetchMessages(accountInfo.token))
	}
	handleClickTab (code) {
		this.setState({ currentTab: code })
	}
	render () {
		const { accountInfo, messagePage } = this.props

		if (!accountInfo.token) {
			return (
				<div className="account-info-wrapper">
			  	<LinkToLoginPage />
			  </div>
			)
		}

		return (
		  <div className="message-wrapper">
		  	<div className="message-header-wrapper">
		  		消息
		  	</div>
		  	<div className="message-content-wrapper">
		  		<div className="message-tab-wrapper">
		  			<ul className="message-tabs">
		  				{
		  					TABS.map(item => 
		  						<li 
		  							key={item.code} 
		  							className={cx('message-tab', { active: item.code == this.state.currentTab })}
		  							onClick={ () => this.handleClickTab(item.code) }
	  							>
	  								{item.name}
	  								{item.code == 'hasnot_read_messages' && messagePage.unread_count > 0 &&
	  									<span className="unread-count-tag">{messagePage.unread_count}</span>
	  								}
	  							</li>
	  						)
		  				}
		  			</ul>
		  		</div>
		  		<div className="message-content">
		  			{(() => {
		  				return (messagePage.messages[this.state.currentTab] || []).length > 0 ?
		  					<ul className="message-list">
		  						{(messagePage.messages[this.state.currentTab] || []).map(item => 
		  							<li key={item.id} className="list-item">
		  								<Link to={`/user/${item.author.loginname}`}>{item.author.loginname}</Link> 回复了你的话题 
		  								<Link to={`/topic/${item.topic.id}`}> {item.topic.title}</Link>
		  								<span className="last-reply-at">{prettyDate(item.create_at)}</span>
		  							</li>
	  							)}
		  					</ul> :
		  					<div className="empty">暂无数据</div>
		  			})()}
		  		</div>
		  	</div>
		  	<Footer />
		  </div>
		)
	}
}

const mapStateToProps = state => {
	const { accountInfo, messagePage } = state
	
	return { accountInfo, messagePage }
}

export default connect(mapStateToProps)(MessagePage)