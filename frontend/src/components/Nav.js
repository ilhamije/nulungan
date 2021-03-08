import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';


class SimpleNav extends Component {
    render() {
        return (
            <Navbar variant="light" expand="lg">
                <Navbar.Brand href="/">NulunganORG</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/addlapak">Add</Nav.Link>
                        </Nav.Item>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        );
    }
}

SimpleNav.propTypes = {
    // toggleFilter: PropTypes.func.isRequired,
    // clearFilter: PropTypes.func.isRequired,
    // handleFilterChange: PropTypes.func.isRequired,
};

export default SimpleNav;