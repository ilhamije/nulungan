import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { priceFormat } from './utils/Formatters.js';
import { Col, Button, Form, Container } from 'react-bootstrap';


class Filter extends Component {
    render() {
        const { toggleFilter, handleFilterChange, clearFilter } = this.props;
        return (
            <Container>
                <Form ref={input => this.form = input} className="filter">
                    <Form.Row>
                        <Form.Group as={Col} >

                            <Form.Label htmlFor="filterCity">City</Form.Label>

                            <Form.Control as="select" value={handleFilterChange.value}
                                id="filterCity" name="filterCity" onChange={e => handleFilterChange(e)}>
                                <option value="any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Control>

                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group inline="true" >
                            <Button variant="outline-success" onClick={e => clearFilter(e, this.form)}>Clear</Button>
                            <Button variant="outline-success" onClick={ e => toggleFilter(e) }><span>Close</span></Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

Filter.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;