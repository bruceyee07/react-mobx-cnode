import React, { Component } from 'react'
import { observer } from 'mobx-react'
import NavTab from '../NavTab'
import TopicList from '../TopicList'
import './style.styl'

@observer
class HomePage extends Component {
	componentDidMount() {
		const { store } = this.props
		store.fetchTopics()
	}
	render () {
		const { store } = this.props

		return <div className="homepage-wrapper">
			<NavTab store={store} />
			<TopicList store={store} />
		</div>
	}
}

export default HomePage