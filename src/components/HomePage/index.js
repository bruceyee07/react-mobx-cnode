import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import NavTab from '../NavTab'
import TopicList from '../TopicList'

import './style.styl'

let topicList = observable({
	isFetching: false,
	tab: 'all',
	topics: []
})

@observer
class HomePage extends Component {
	constructor (props) {
		super(props)

		this.fetchTopics = this.fetchTopics.bind(this)
		this.handleClickTab = this.handleClickTab.bind(this)
	}
	componentDidMount () {
		this.fetchTopics('all', 1)
	}
	render () {
		return <div className="homepage-wrapper">
			<NavTab handleClickTab={this.handleClickTab} />
			<TopicList topicList={topicList} />
		</div>
	}
	@action fetchTopics (tab = 'all', page = 1, limit = 20) {
		topicList.isFetching = true

		fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)
			.then(res => res.json())
			.then(json => {
				topicList.isFetching = false
				topicList.topics = json.data
			})
	}
	@action handleClickTab (tab) {
		console.log(tab.code)
	}
}

export default HomePage