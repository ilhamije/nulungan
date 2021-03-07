import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Container, Col, Form, Button } from 'react-bootstrap';
// import axios from 'axios';


class LapakForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lapak_name: '',
            lapak_type: '',
            address: '',
            city: '',
            sosmed_link: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log('hey change', event.target.name)
    }

    handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);
        console.log('hey submit', this.state)

        fetch('/lapaks/', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // We convert the React state to JSON and send it as the POST body
        })
        .then(function (response) {
            console.log('is it working?')
            console.log(response)
            return response.json();
        }).catch(function (error) {
            console.log('is it NOT working?')
            console.log(error);
        });

        event.preventDefault();
        this.setState({
            lapak_name: '',
            lapak_type: '',
            address: '',
            city: '',
            sosmed_link: ''
        });
    }


    render() {
        // const { handleLapakFormSubmit } = this.props;
        // const { handleSubmit } = this.props;
        return (
            <Container>
                {/* <Form ref={input => this.form = input} className="LapakForm"> */}
                {/* <Form className="LapakForm" onSubmit={handleLapakFormSubmit}> */}
                <Form
                    className="LapakForm"
                    onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md={8}>
                            <Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text"
                                    name="lapak_name"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Nama si fulan (jika diketahui)" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Jenis Dagangan</Form.Label>
                                <Form.Control type="text"
                                    name="lapak_type"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="ex: peyek, bakso, dll" />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text"
                                    name="address"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Nama jalan juga boleh" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kota</Form.Label>
                                <Form.Control type="text"
                                    name="city"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Nama kota" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sosmed Link Info</Form.Label>
                                <Form.Control type="text"
                                    name="sosmed_link"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Link untuk info terkait" />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

LapakForm.propTypes = {
    // toggleLapakForm: PropTypes.func.isRequired,
    // clearLapakForm: PropTypes.func.isRequired,
    // handleLapakFormSubmit: PropTypes.func.isRequired,
};

export default LapakForm;