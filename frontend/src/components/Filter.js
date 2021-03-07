import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';


class Filter extends Component {
    render() {
        const { handleFilterChange } = this.props;
        return (
            <>
                <Form ref={input => this.form = input} className="filter">
                    <Form.Row>
                        <Form.Group as={Col} md={8}>
                            <Form.Control type="text"
                                id="filterCity"
                                name="filterCity"
                                value={handleFilterChange.value}
                                onChange={e => handleFilterChange(e)}
                                placeholder="Cari sini, kak..">
                            </Form.Control>

                        </Form.Group>
                    </Form.Row>
                </Form>
            </>
        );
    }
}

Filter.propTypes = {
    // toggleFilter: PropTypes.func.isRequired,
    // clearFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;