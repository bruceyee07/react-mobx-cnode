import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { prettyDate } from '../../utils'
import { TABS } from '../../consts'
import style from './style.styl'

@observer
class TopicList extends Component {
	render () {
		const { store } = this.props || {}
		
		return (
   		<div className="topic-list-wrapper">
				{store.isFetching && store.topics.length === 0 &&
	        <h2 className="empty">Loading...</h2>
	      }
	      {!store.isFetching && store.topics.length === 0 &&
	        <h2 className="empty">Empty.</h2>
	      }
	      {!!store.topics.length &&
	        <div style={{ opacity: store.isFetching ? 0.5 : 1 }}>
	          <ul className="topic-list">
	          	{store.topics.map(topic => 
	          		<li key={topic.id}>
	          			<div className="left-wrap">
	          				<Link
	          					to={`/user/${topic.author['loginname']}`}
	          				>
		          				<img 
		          					className="avatar" 
		          					src={topic.author['avatar_url'].indexOf('https:') > -1 ? topic.author['avatar_url'] : 'https:' + topic.author['avatar_url']} 
		          					alt={topic.author['loginname']} 
		          					onClick={() => this.props.handleClickUserAvatar(topic.author['loginname'])}
	          					/>
	          				</Link>
	          			</div>
	          			<div className="right-wrap">
		          			<div className="top-info">
		          				{topic.good && <span className="iconfont good-icon">精</span>}
                      {topic.top && <span className="iconfont top-icon">顶</span>}
		          				<Link 
			          				to={`/topic/${topic.id}`}
			          				className="title"
			          				onClick={() => this.props.handleClickTopic(topic.id)}
	          					>
	          						{topic.title}
	        						</Link>	
		          			</div>
	        					<div className="bottom-info">
	        						<span>{topic.reply_count} / {topic.visit_count}</span>
	        						<span className="topic-info">{(TABS.filter(item => item.code == topic.tab)[0] || {}).title}</span>
	        						<span className="date-info">{prettyDate(topic.create_at)}</span>
	        					</div>
	          			</div>
        				</li>
          		)}
	          </ul>
	        </div>
	      }
   		</div>
		)
	}
}

export default TopicList