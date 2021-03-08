import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Filter from './Filter';
import LapakForm from './Form';

import './HeaderStyle.css'


function Header({ lapakFormIsVisible, toggleLapakForm, handleFilterChange, clearFilter }) {
    return (
        <Container fluid
            style={{ marginBottom: "30px", marginTop: "50px" }}>
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

                        <Button
                            class="btn-sm"
                            variant="outline-primary"
                            onClick={e => toggleLapakForm(e) }>Add Data</Button>
                    </div>
                    <div className={`${lapakFormIsVisible ? 'invisible' : ''}`}>
                        <LapakForm
                            toggleLapakForm={toggleLapakForm}/>
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
    lapakFormIsVisible: PropTypes.bool.isRequired,
    toggleLapakForm: PropTypes.func.isRequired,
};

export default Header;
