import React, { Component } from 'react'
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import AdminNavbar from "../../../components/Navbars/AdminNavbar_Default.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from 'axios'

import routes from "./../../../routes";

class Home extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            user: {},
            mess: ''
        }
        this.logout = this.logOut.bind(this)
    }
    logOut() {
        axios.post('/api/logout')
            .then(response => {
                let appState = {
                    isLoggedIn: false,
                    user: {}
                }
                localStorage['appState'] = JSON.stringify(appState)
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: '',
                    mess: response.data.message
                })
                location.href = location.origin + '/admin'

            })
    }

    componentDidMount() {
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state)
            this.setState(prevState => ({
                ...prevState,
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            }))
        }
    }

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes(routes) {
        return routes.map((prop, key) => {
            if (prop.layout === "/dashboard") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBrandText(path) {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
                <Sidebar
                    {...this.props}
                    logOut={this.logout}
                    routes={routes}
                    logo={{
                        innerLink: "/",
                        imgSrc: "../../../../argon/img/brand/mlgsd.png",
                        imgAlt: "..."
                    }}
                />
                <div className='main-content' ref="mainContent">
                    <AdminNavbar
                        {...this.props}
                        logOut={this.logout}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    {
                        // this.props.location.pathname === ('/dashboard/complain') ?
                        //     <div className="row">
                        //         <Col className='pt-7 col-12 col-sm-12'>
                        //             < PoliceForm locNow="dashboard" />
                        //         </Col>
                        //     </div> : ""
                    }
                    <Switch cl>
                        {this.getRoutes(routes)}
                        <Redirect from="*" to="/dashboard/index" />
                    </Switch>
                    {/* <Container fluid>
                        <AdminFooter />
                    </Container> */}
                    {/* <Footer /> */}
                </div>
            </>
        )
    }
}

export default Home