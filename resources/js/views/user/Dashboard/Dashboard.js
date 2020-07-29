import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import { Row } from 'reactstrap'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }

    UNSAFE_componentWillMount() {
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state)
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            })
        }
    }

    render() {
        return (
            <>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <div className='header bg-gradient-default py-7 py-lg-8'>
                    <div className='container'>
                        <Row>
                            <span>Whatever normally goes into the user dasboard page; the table below for instance</span> <br />
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="row ">User Id</th>
                                        <td>{this.user.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row ">Full Name</th>
                                        <td>{this.user.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row ">Email</th>
                                        <td>{this.user.email}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </Row>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Home