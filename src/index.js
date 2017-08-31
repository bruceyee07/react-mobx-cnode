import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Store from './stores'
import Root from './containers'
import './style.styl'

const store = new Store()
ReactDOM.render(<Root store={store} />, document.getElementById('root'))