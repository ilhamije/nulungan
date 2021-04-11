import React, { Component } from 'react';
import { Redirect } from 'react-router'
// import PropTypes from 'prop-types';
import { Container, Col, Form, Button, Alert } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import './DefaultStyle.css';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fireRedirect: false,
            showMessage: false,
            msgStatus: false
        };
        this.validator = new SimpleReactValidator({
            messages: {
              default: 'Bagian ini wajib.'
            },
            element: message => <div className="invalid-msg"><small>{message}</small></div>
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);
        console.log('hey submit', this.state)


        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ fireRedirect: false });
        }

        fetch('/users/token/obtain/', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // We convert the React state to JSON and send it as the POST body
        })
        // .then(function (response) {
        .then(response => {
            if (!response.ok) {
                console.log('It\'s NOT working. ');
                this.setState({ msgStatus: false });
            } else {
                console.log('is it working?')
                console.log(response)
            }
            return response.json();
        })
        .then(() => {
            this.setState({ msgStatus: true });
            window.setTimeout(
                () => this.setState({ fireRedirect: true }), 3000);
        })
        .catch(function (error) {
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
                    className="LoginForm"
                    onSubmit={this.handleSubmit}>


                    <Form.Row>
                        <Form.Group as={Col} md={{span:8, offset: 2}}>
                            <h2 className="h1-title">Login dulu ya kakak.</h2>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                                {this.validator.message('email', this.state.email, 'required')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                {this.validator.message('password', this.state.password, 'required')}
                            </Form.Group>

                            <div>
                                {showMessage &&
                                    <div>
                                        {
                                            this.state.msgStatus ?
                                                <Alert variant="success"> Asyik! Berhasil, kak.</Alert>
                                                :
                                                <Alert variant="warning"> Yahh, gak bisa login nih kak.</Alert>
                                        }
                                    </div>
                                }
                            </div>

                            <Form.Group>
                                <Button variant="primary" type="submit">Masuk</Button>{' '}
                                <Button variant="outline-dark" href="/">Batal</Button>
                            </Form.Group>

                        </Form.Group>
                    </Form.Row>
                </Form>

                {/* {this.state.msgStatus && fireRedirect && (
                    <Redirect
                        wait={2000}
                        to={from || '/'} />
                )} */}

            </Container>
        );
    }
}

LoginForm.propTypes = {
    // clearLapakForm: PropTypes.func.isRequired,
    // handleLapakFormSubmit: PropTypes.func.isRequired,
    // toggleLapakForm: PropTypes.func.isRequired,
};

export default LoginForm;