import { observable, computed, action, autorun } from 'mobx'

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
}

export default Store