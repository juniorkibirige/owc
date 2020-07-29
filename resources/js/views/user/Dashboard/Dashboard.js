import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from '../../../components/Footer/Footer'
import { Row, Container } from 'reactstrap'
import Logo from '../../../../../public/argon/img/brand/mlgsd.png'
import AdminNavbar from "../../../components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "../../../components/Sidebar/Sidebar";

import routes from "./../../../routes";
import Stats from '../../../components/Stats';

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

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes(routes) {
        return routes.map((prop, key) => {
            console.log(prop.layout)
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
            <div className='g-sidenav-show g-sidenav-pinned'>
                {/* <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} /> */}
                <Sidebar
                    {...this.props}
                    routes={routes}
                    logo={{
                        innerLink: "/",
                        imgSrc: "../../../../argon/img/brand/mlgsd.png",
                        imgAlt: "..."
                    }}
                />
                <div className="main-content" ref="mainContent">
                    <AdminNavbar
                        {...this.props}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <Stats />
                    <br />
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="*" to="/dashboard/index" />
                    </Switch>
                    {/* <Container fluid>
                        <AdminFooter />
                    </Container> */}
                    {/* <Footer /> */}
                </div>
            </div>
        )
    }
}

export default Home