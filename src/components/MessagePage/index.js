import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import PropTypes from 'prop-types'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'
import LinkToLoginPage from '../LinkToLoginPage'
import Footer from '../Footer'
import { prettyDate, storeToken } from '../../utils'
import { MESSAGE_TABS as TABS } from '../../consts'
import style from './style.styl'

@observer
class MessagePage extends Component {
	constructor (props) {
		super(props)

		this.state = {
			currentTab: 'hasnot_read_messages'
		}

		this.handleClickTab = this.handleClickTab.bind(this)
	}
	componentDidMount () {
		const { store } = this.props
		const accountInfo = JSON.parse(storeToken('accountInfo'))

		store.fetchUnreadMessagesCount(accountInfo.token)
		store.fetchMessages(accountInfo.token)
	}
	handleClickTab (code) {
		this.setState({ currentTab: code })
	}
	render () {
		const { store, unReadMsgCount, messages } = this.props
		const accountInfo = JSON.parse(storeToken('accountInfo'))

		if (!accountInfo) {
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
	  								{item.code == 'hasnot_read_messages' && store.unReadMsgCount > 0 &&
	  									<span className="unread-count-tag">{store.unReadMsgCount}</span>
	  								}
	  							</li>
	  						)
		  				}
		  			</ul>
		  		</div>
		  		<div className="message-content">
		  			{(() => {
		  				return (store.messages[this.state.currentTab] || []).length > 0 ?
		  					<ul className="message-list">
		  						{(store.messages[this.state.currentTab] || []).map(item => 
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
		  	<Footer store={store} />
		  </div>
		)
	}
}

export default MessagePage