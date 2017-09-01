import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import { prettyDate } from '../../utils'
import style from './style.styl'

@observer
class UserCenter extends Component {
	componentDidMount() {
		const { store, routes } = this.props
		const userName = routes.match.params.userName

		store.fetchUserInfo(userName)
	}
	render () {
		const { store } = this.props
		const userInfo = store.userInfo || null

		return userInfo ? 
			<div className="user-center-wrap">
				<div className="block-item">
					<div className="panel-header">
						<span className="homepage-title">个人主页</span>
						<span className="divider">/</span>
					</div>
					<div className="panel-body">
						<div className="user-avatar-wrap">
							<img className="user-avatar" src={userInfo.avatar_url} />
							<span className="user-name">{userInfo.loginname}</span>
						</div>
						<div className="user-score">{userInfo.score} 积分</div>
					</div>
				</div>
				<div className="block-item">
					<div className="panel-header">最近创建的话题</div>
					<div className="panel-body">
						<ul className="topic-list">
							{userInfo.recent_topics.map(item => 
								<li key={item.id} className="list-item">
									<div className="left-content">
										<img className="tiny-avatar" src={item.author.avatar_url} />
									</div>
									<div className="right-content">
										<Link to={`/topic/${item.id}`}>{item.title}</Link>
										<span className="last-reply-wrap">{prettyDate(item.last_reply_at)}</span>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="block-item">
					<div className="panel-header">最近参与的话题</div>
					<div className="panel-body">
						<ul className="topic-list">
							{userInfo.recent_replies.map(item => 
								<li key={item.id} className="list-item">
									<div className="left-content">
										<img className="tiny-avatar" src={item.author.avatar_url} />
									</div>
									<div className="right-content">
	          				<Link to={`/topic/${item.id}`}>{item.title}</Link>
	          				<span className="last-reply-wrap">{prettyDate(item.last_reply_at)}</span>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div> : null
	}
}

export default UserCenter