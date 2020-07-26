import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PoliceForm from './PoliceForm'
import Header from './Header'
import Forms from './Forms'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={Forms} />
                    <Route path='/create' component={PoliceForm} />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))