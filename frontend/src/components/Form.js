import React, { Component } from 'react';
import { Redirect } from 'react-router'
// import PropTypes from 'prop-types';
import { Container, Col, Form, Button, Alert } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import './DefaultStyle.css';


class LapakForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lapak_name: '',
            lapak_type: '',
            address: '',
            city: '',
            sosmed_link: '',
            fireRedirect: false,
            showMessage: false,
            msgStatus: false
        };
        this.validator = new SimpleReactValidator({
            messages: {
              default: 'Bagian ini wajib.'
            },
            element: message => <div className="invalid-msg">{message}</div>
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);
        console.log('hey submit', this.state)
        if (this.validator.allValid()) {
            alert('you rocks!');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

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
        })
        .then(() => {
            this.setState({ msgStatus: true });
            window.setTimeout(
                () => this.setState({ fireRedirect: true }), 3000);
        })
        .catch(function (error) {
            console.log('is it NOT working?')
            console.log(error);
        });

        this.setState({ showMessage: true });
        event.preventDefault();
        this.formRef.reset();
    }


    render() {
        const { from } = this.props.location || '/'
        const { showMessage, fireRedirect } = this.state
        return (
            <Container>
                <Form
                    style={{ marginBottom: "30px", marginTop: "50px" }}
                    ref={(ref) => this.formRef = ref}
                    className="LapakForm"
                    onSubmit={this.handleSubmit}>


                    <Form.Row>
                        <Form.Group as={Col} md={{span:8, offset: 2}}>
                            <h2 className="h1-title">Tambahkan Lapak</h2>
                            <p>
                                {showMessage &&
                                    <div>
                                        {
                                            this.state.msgStatus ?
                                                <Alert variant="success">Data is added successfully.</Alert>
                                                :
                                                <Alert variant="warning"> Failed</Alert>
                                        }
                                    </div>
                                }
                            </p>
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
                                {this.validator.message('lapak_type', this.state.value, 'required')}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text"
                                    name="address"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Nama jalan juga boleh" />
                                {this.validator.message('address', this.state.value, 'required')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kota</Form.Label>
                                <Form.Control type="text"
                                    name="city"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Nama kota" />
                                {this.validator.message('city', this.state.value, 'required')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sosmed Link Info</Form.Label>
                                <Form.Control type="text"
                                    name="sosmed_link"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="Link untuk info terkait" />
                            </Form.Group>


                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Tambahkan
                                </Button>
                            </Form.Group>

                        </Form.Group>
                    </Form.Row>
                </Form>

                {this.state.msgStatus && fireRedirect && (
                    <Redirect
                        wait={5000}
                        to={from || '/'} />
                )}




            </Container>
        );
    }
}

LapakForm.propTypes = {
    // clearLapakForm: PropTypes.func.isRequired,
    // handleLapakFormSubmit: PropTypes.func.isRequired,
    // toggleLapakForm: PropTypes.func.isRequired,
};

export default LapakForm;