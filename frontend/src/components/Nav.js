import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Nav, Navbar, Button } from 'react-bootstrap';
import logo from './../images/nulungan-inline-25.png'
// import AddLapakButton from './AddLapakButton';


class SimpleNav extends Component {
    render() {
        return (
            <Navbar
                style={{ marginLeft: "10px", marginTop: "5px", marginBottom: "-5px" }}>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="90%"
                        className="d-inline-block"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            {/* <AddLapakButton /> */}
                            <Nav.Link href="/addlapak">
                                <Button size="sm" variant="dark">Add Lapak</Button>
                            </Nav.Link>
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