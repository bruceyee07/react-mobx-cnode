import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import cx from 'classnames'
import { FOOTER_TABS as TABS } from '../../consts'
import './style.styl'

@observer
class Footer extends Component {
	render () {
		const { store } = this.props
		console.log(store)
		
		return (
			<ul className="nav-footer">
				{
					TABS.map(tab => {
						return (
							<li
								key={tab.code}
								className={cx('list-item', { active: tab.code == store.footerTab })}
								onClick={() => store.handleClickFooterTab(tab.code)}
							>
								<Link to={tab.url}>{tab.title}</Link>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default Footer