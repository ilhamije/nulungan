import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import { Row, Container } from 'react-bootstrap';

import './DefaultStyle.css'

const Header = ({ filterIsVisible, toggleFilter, handleFilterChange, clearFilter }) => (
    <Container>
        <Row>
            {/* <Button variant="outline-primary" onClick={ e => toggleFilter(e) }>Filter</Button> */}
        </Row>
        <Row>
            {/* <div className={`${filterIsVisible ? 'invisible' : ''}`}> */}
            <div className="my-default-style">
                <h1>Nulungan</h1>
                <Filter
                    toggleFilter={toggleFilter}
                    handleFilterChange={handleFilterChange}
                    clearFilter={clearFilter}
                />
            </div>
        </Row>
    </Container>
);

Header.propTypes = {
    filterIsVisible: PropTypes.bool.isRequired,
    toggleFilter: PropTypes.func.isRequired,
};

export default Header;
