import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import NavTab from '../NavTab'
import TopicList from '../TopicList'
import './style.styl'

@observer
class HomePage extends Component {
	constructor (props) {
		super(props)

		this.handleScroll = this.handleScroll.bind(this)
	}
	componentDidMount() {
		const { store } = this.props
		store.fetchTopics()
	}
	render () {
		const { store } = this.props

		return <div className="homepage-wrapper">
			<NavTab store={store} />
			<TopicList ref="topic-list" store={store} handleScroll={this.handleScroll} />
		</div>
	}
	handleScroll () {
		const { store } = this.props 
		const topicList = ReactDOM.findDOMNode(this.refs['topic-list'])
		const needFetchMoreTopics = topicList.scrollHeight <= topicList.scrollTop + topicList.offsetHeight

		store.handleScroll(needFetchMoreTopics)
	}
}

export default HomePage