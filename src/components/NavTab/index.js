import React, { Component } from 'react'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'

import './style.styl'

const TABS = [
	{
		title: '全部',
		code: 'all'
	},
	{
		title: '精华',
		code: 'good',
	},
	{
		title: '分享',
		code: 'share'
	},
	{
		title: '问答',
		code: 'ask'
	},
	{
		title: '招聘',
		code: 'job'
	}
]

let currentTab = observable({
	title: '全部',
	code: 'all'
})

@observer
class NavTab extends Component {
	render () {
		return (
			<ul className="nav-tab">
				{TABS.map(tab => 
					<li
						key={tab.code}
						className={cx({ active: tab.code == currentTab.code })}
						onClick={() => this.props.handleClickTab(tab)}
					>
						{tab.title}
					</li>
				)}
			</ul>
		)
	}
}

export default NavTab