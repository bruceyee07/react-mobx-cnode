import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinkToLoginPage from '../LinkToLoginPage'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import Footer from '../Footer'
import { DELIVER_TYPES } from '../../consts'
import { storeToken } from '../../utils'
import style from './style.styl'

@observer
class DeliverPage extends Component {
	constructor (props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}
	render () {
		const { store } = this.props

		if (!storeToken('accountInfo')) {
			return (
				<div className="deliver-page-wrapper">
			  	<LinkToLoginPage />
			  </div>
			)
		}

		return (
		  <div className="deliver-page-wrapper">
		  	<div className="deliver-page-header">发表主题</div>
		  	<div className="deliver-page-content">
		  		<div className="deliver-type-select">
		  			<label>请选择主题类型：</label>
		  			<select ref="deliver-type-select">
		  				{DELIVER_TYPES.map(item =>
		  					<option key={item.code} value={item.code}>{item.name}</option>
	  					)}
		  			</select>
		  		</div>
		  		<div className="deliver-title-input">
		  			<input ref="deliver-title-input" type="text" placeholder="请输入标题" />
		  		</div>
		  		<div className="deliver-content-textarea">
		  			<textarea ref="deliver-content-textarea" placeholder="请输入内容" />
		  		</div>
		  		<button className="deliver-btn" type="submit" onClick={this.handleSubmit}>发表</button>
		  	</div>
		  	<Footer store={store} />
		  </div>
		)
	}
	handleSubmit () {
		const { store } = this.props
		const index = this.refs['deliver-type-select'].selectedIndex
		const type = this.refs['deliver-type-select'][index].value
		const title = this.refs['deliver-title-input'].value
		const content = this.refs['deliver-content-textarea'].value

		store.deliverTopic(accountInfo.token, type, title, content, (id) => {
			setTimeout(() => { this.props.history.push(`/topic/${id}`) }, 1000)
		})
	}
}

export default DeliverPage