import { observable, computed, action, autorun } from 'mobx'
import { storeToken, deleteToken } from '../utils'

class Store {
	@observable tab = 'all'
	@action handleClickTab (tab) {
		this.tab = tab
		this.page = 1
		this.topics = []
		this.fetchTopics(tab)
	}

	@observable page = 1
	@observable isFetching = false
	@observable topics = []
	@action fetchTopics (tab = 'all', page = 1, limit = 20) {
		this.isFetching = true

		fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)
			.then(res => res.json())
			.then(json => {
				this.isFetching = false
				this.topics = this.topics.length == 0 ? json.data : this.topics.concat(json.data)
			})
	}
	@action handleScroll (flag) {
		if (!this.isFetching && flag) {
			this.page ++
			this.fetchTopics(this.tab, this.page)
		}
	}

	@observable currentTopic = null
	@action fetchTopicDetail (topic_id) {
		fetch(`https://cnodejs.org/api/v1/topic/${topic_id}`)
			.then(res => res.json())
			.then(json => { this.currentTopic = json.data })
	}
	
	@observable footerTab = 'index'
	@action handleClickFooterTab (tab) {
		this.footerTab = tab
	}

	@observable loginSucceed = false
	@observable loginFailed = false
	@observable loginReset = false
	@observable accountInfo = null
	@action requestLogin (token, callback) {
		fetch('https://cnodejs.org/api/v1/accesstoken', {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `accesstoken=${token}`
		})
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				this.loginSucceed = true
				this.accountInfo = { 
					loginname: json.loginname, 
					id: json.id, 
					avatar_url: json.avatar_url,
					token: token
				}
				storeToken('accountInfo', this.accountInfo)
				callback()
			}
		})
		.then(setTimeout(() => { this.loginReset = true }, 2000))
	}
	@action logout (callback) {
		deleteToken('accountInfo')
		callback()
	}

	@observable userInfo = null
	@action fetchUserInfo (userName) {
		fetch(`https://cnodejs.org/api/v1/user/${userName}`)
			.then(res => res.json())
			.then(json => { this.userInfo = json.data })
	}

	@action deliverTopic (token, type, title, content, callback) {
		fetch('https://cnodejs.org/api/v1/topics', {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `accesstoken=${token}&tab=${type}&title=${title}&content=${content}`
		})
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				callback(json.topic_id)
			}
		})
	}

	@observable unReadMsgCount = 0
	@observable messages = []
	@action fetchUnreadMessagesCount (token) {
		fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				this.unReadMsgCount = json.data
			}
		})
	}
	@action fetchMessages (token) {
		fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				this.messages = json.data
			}
		})
	}
}

export default Store