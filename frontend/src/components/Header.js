import React from 'react';
// import PropTypes from 'prop-types';
import Filter from './Filter';
import { Row, Container, Col } from 'react-bootstrap';

import './HeaderStyle.css'


function Header({ handleFilterChange, clearFilter }) {
    return (
        <Container style={{ marginBottom: "30px", marginTop: "50px" }}>
            <Row>
                <Col>
                    <div>
                        <small>Nulugan.ORG</small>
                        <h1 className="h1-title">Bantu beli dagangan mereka, yuk! </h1>
                    </div>
                    <div>
                        <Filter
                            handleFilterChange={handleFilterChange}
                            clearFilter={clearFilter} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

// Header.propTypes = {
//     filterIsVisible: PropTypes.bool.isRequired,
//     toggleFilter: PropTypes.func.isRequired,
// };

export default Header;
