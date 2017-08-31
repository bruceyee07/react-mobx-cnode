import { observable, computed, action, autorun } from 'mobx'

class Store {
	@observable tab = 'all'
	@action handleClickTab (tab) {
		this.tab = tab
		this.fetchTopics(tab)
	}

	@observable page = 1
	@observable isFetching = false
	@observable topics = []
	@action fetchTopics (tab = 'all', page = 1, limit = 20) {
		this.isFetching = true
		this.tab = tab

		fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)
			.then(res => res.json())
			.then(json => {
				this.isFetching = false
				this.topics = json.data
			})
	}
}

export default Store