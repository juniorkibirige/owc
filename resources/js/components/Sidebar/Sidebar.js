import React, { Component } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import Sidebar_Default from './Sidebar_Default'

// nodejs library to set properties for components
import { PropTypes } from "prop-types";

Sidebar
var ps;

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidenavOpen: true
    };
    this.activeRoute.bind(this);
  }
  componentDidMount() {
    this.props.history.sidenavOpen = this.state.sidenavOpen
    this.props.history.toggleSideNav = this.toggleSideNav
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  // toggleSideNav() {
  //   console.log("toggled")
  //   if (document.body.classList.contains("g-sidenav-pinned")) {
  //     document.body.classList.remove("g-sidenav-pinned")
  //     document.body.classList.add("g-sidenav-hidden")
  //   } else {
  //     document.body.classList.add("g-sidenav-pinned");
  //     document.body.classList.remove("g-sidenav-hidden");
  //   }
  //   this.props.history.sidenavOpen = !this.props.history.sidenavOpen
  //   this.setState({
  //     sidenavOpen: !this.state.sidenavOpen
  //   })
  // };

  render() {
    const { routes } = this.props;
    return (
      <>
        <Sidebar_Default
          {...this.props}
          routes={routes}
          toggleSideNav={this.props.sNOpen}
          sidenavOpen={this.props.sOpen}
          logo={{
            innerLink: "/dashboard",
            imgSrc: require("./../../../../public/favicon.svg"),
            imgAlt: "Police Web Portal"
          }}
        />
        {/* {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSideNav} />
        ) : null} */}
      </>
    )
  }
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSideNav: () => {},
  sidenavOpen: false
};

Sidebar.propTypes = {
  toggleSideNav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),

  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
