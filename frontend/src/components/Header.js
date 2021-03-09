import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HeaderStyle.css'
// import PropTypes from 'prop-types';
import Filter from './Filter';


function Header({ handleFilterChange, clearFilter }) {
    return (
        <Container fluid
            style={{ marginBottom: "10px", marginTop: "30px" }}>
            <Row>
                <Col>
                    <div>
                        <h2 className="h1-title">Bantu beli dagangan mereka, yuk! </h2>
                    </div>
                    <div>
                        <Filter
                            handleFilterChange={handleFilterChange}
                            clearFilter={clearFilter} />

                    </div>
                </Col>
            </Row>
            <hr />
        </Container>
    );
}

Header.propTypes = {
//     filterIsVisible: PropTypes.bool.isRequired,
//     toggleFilter: PropTypes.func.isRequired,
    // lapakFormIsVisible: PropTypes.bool.isRequired,
    // toggleLapakForm: PropTypes.func.isRequired,
};

export default Header;
