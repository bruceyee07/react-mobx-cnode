import React, { Component } from 'react'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'
import { TABS } from '../../consts'
import './style.styl'

@observer
class NavTab extends Component {
	render () {
		const { store } = this.props

		return (
			<ul className="nav-tab">
				{TABS.map(tab => 
					<li
						key={tab.code}
						className={cx({ active: tab.code == store.tab })}
						onClick={() => store.handleClickTab(tab.code)}
					>
						{tab.title}
					</li>
				)}
			</ul>
		)
	}
}

export default NavTab