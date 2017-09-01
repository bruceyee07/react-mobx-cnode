import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import { markdown } from 'markdown'
import { prettyDate } from '../../utils'
import style from './style.styl'

@observer
class TopicContent extends Component {
	componentDidMount() {
		const { store } = this.props
		const id = this.props.match.params.id

		store.fetchTopicDetail(id)
	}
	render () {
		const { store } = this.props

		return (
		  <div className="topic-content-wrapper">
		  	<div className="block-item">
		  		<div className="top-bar">
		  			<h3 className="title">{(store.currentTopic.detail || {}).title}</h3>
		  			<ul className="topic-info-list">
		  				<li className="list-item">发布于 {prettyDate((store.currentTopic.detail || {}).create_at)}</li>
		  				<li className="list-item">作者 {((store.currentTopic.detail || {}).author || {}).loginname}</li>
		  				<li className="list-item">{(store.currentTopic.detail || {}).visit_count} 次浏览</li>
		  			</ul>
		  		</div>
		  		<div className="topic-content" dangerouslySetInnerHTML={{__html: (store.currentTopic.detail || {}).content}} />
		  	</div>
		  	{((store.currentTopic.detail || {}).replies || []).length > 0 && <div className="block-item">
		  		<ul className="reply-list">
	  				{((store.currentTopic.detail || {}).replies || []).map(item => 
	  					<li key={item.id} className="list-item">
	  						<div className="left-content">
	  							<img className="tiny-avatar" src={item.author.avatar_url} />
	  						</div>
	  						<div className="main-content">
	  							<div className="reply-content" dangerouslySetInnerHTML={{__html: item.content}} />
	  						</div>
	  						<div className="right-content">
	  							<span className="last-reply-wrap">{prettyDate(item.last_reply_at)}</span>
	  						</div>
	  					</li>
	  				)}
		  		</ul>
		  	</div>}
		  </div>
		)
	}
}

export default TopicContent