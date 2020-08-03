import React, { Component } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import Sidebar_Default from './Sidebar_Default'

// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
Sidebar
var ps;

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidenavOpen: true
    };
    this.activeRoute.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this)
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleSideNav(e) {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned")
      document.body.classList.add("g-sidenav-hidden")
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    })
  };

  render() {
    const { routes } = this.props;
    console.log(this.props.routes)
    return (
      <>
        <Sidebar_Default
          {...this.props}
          routes={routes}
          toggleSideNav={this.toggleSideNav}
          sidenavOpen={this.state.sidenavOpen}
          logo={{
            innerLink: "/dashboard",
            imgSrc: require("./../../../../public/argon/img/brand/favicon.png"),
            imgAlt: "Police Web Portal"
          }}
        />
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSideNav} />
        ) : null}
      </>
    )
  }
  /*
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light px-0"
        expand="md"
        id="sidenav-main"
        style={{ backgroundColor: `rgba(51, 66, 79, 0.85)` }}
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon text-white" />
          </button>
          
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          
          <Nav className="align-items-center d-md-none"
          >
            <UncontrolledDropdown nav className='d-none d-sm-none'>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <div className='mr-3'>
                <Media className="align-items-center">
                  <Link to='#logout' onClick={this.props.logOut}>
                    <Media id="logout" className="align-items-center text-white" onClick={this.props.logOut}>
                      <span>
                        <i className="fa fa-angle-left"></i>
                      </span>
                      <Media className="ml-2 d-lg-block">
                        <span className="mb-0 text-sm text-white font-weight-bold">
                          LOG OUT
                      </span>
                      </Media>
                    </Media>
                  </Link>
                  
                </Media>
              </div>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
          <Collapse navbar isOpen={this.state.collapseOpen}>
          
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                        <a href={logo.outterLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>
                      )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            
            <Form className="mt-4 mb-3 d-md-none d-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            
            <Nav navbar>{this.createLinks(routes)}</Nav>
            
          </Collapse>
        </Container>
      </Navbar>
    );
  } */
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
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
