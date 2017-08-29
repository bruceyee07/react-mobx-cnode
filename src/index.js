import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observable, computed, action, autorun } from 'mobx'
import { observer } from 'mobx-react'

import './style.styl'

class Todo {
	id = Math.random()
	@observable title = ''
	@observable finished = false
	constructor (title) {
		this.title = title
	}
}

class TodoList {
	@observable todos = []
	@computed get unfinishedTodoCount () {
		return this.todos.filter(todo => !todo.finished).length
	}
}

@observer
class TodoListView extends Component {
	render () {
		return (
			<div>
				<ul>
					{this.props.todoList.todos.map(todo => 
						<TodoView key={todo.id} todo={todo} />
					)}
				</ul>
				Tasks Left: {this.props.todoList.unfinishedTodoCount}
			</div>
		)
	}
}

const TodoView = observer(({todo}) => 
	<li>
		<input
			type="checkbox"
			checked={todo.finished}
			onClick={() => todo.finished = !todo.finished}
		/>{todo.title}
	</li>
)

const store = new TodoList()
store.todos.push(
  new Todo('Get Coffee'),
  new Todo('Write simpler code')
)
store.todos[0].finished = true



let appState = observable({
	timer: 0
})

appState.resetTimer = action(function reset () {
	appState.timer = 0
})

setInterval(action(function tick () {
	appState.timer += 1
}), 1000)

@observer
class TimerView extends Component {
	constructor (props) {
		super(props)
		this.onReset = this.onReset.bind(this)
	}
	render () {
		return (
			<button onClick={this.onReset}>
				Seconds passed: {this.props.appState.timer}
			</button>
		)
	}
	onReset () {
		this.props.appState.resetTimer()
	}
}

const temperature = observable(20)
temperature.set(25)

autorun(function () {
	console.log(temperature)
})

ReactDOM.render(<div>
	<TodoListView todoList={store} />
	<TimerView appState={appState} />
</div>, document.getElementById('root'))