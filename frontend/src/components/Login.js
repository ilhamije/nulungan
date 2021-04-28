import React, { useState } from 'react';
// import { Redirect } from 'react-router'
// import PropTypes from 'prop-types';
import { Container, Col, Form, Button, Alert } from 'react-bootstrap';
// import SimpleReactValidator from 'simple-react-validator';
// import useValidator from 'simple-react-validator-hooks';

import './DefaultStyle.css';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [fireRedirect, setFireRedirect] = useState('false');
    const [showMessage, setShowMessage] = useState(false);
    const [msgStatus, setMsgStatus] = useState(false);

    const handleEmailInput = e => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);
        // console.log('hey submit', this.state)

        // if (validator.allValid()) {
        //     console.log('Submit Data')
        // } else {
        //     // turn on validation message and re-render
        //     showValidationMessage(true)
        // }

        fetch('/users/token/obtain/', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // We convert the React state to JSON and send it as the POST body
        })
        .then(response => response.json())
        // .then(data => console.log(JSON.stringify(data)))
        .then(data => {
            // console.log(JSON.stringify(data));
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            // this.setState({ msgStatus: true });
            setMsgStatus(true);
        })
        // .then(() => {
        //     window.setTimeout(() => setFireRedirect(true))
        // })
        .catch(error => console.log(error));

        // this.setState({ showMessage: true });
        setShowMessage(true);
        event.preventDefault();
    }

    return (
        <Container>
            <Form
                style={{ marginBottom: "30px", marginTop: "50px" }}
                className="LoginForm"
                onSubmit={handleSubmit}>


                <Form.Row>
                    <Form.Group as={Col} md={{span:8, offset: 2}}>
                        <h2 className="h1-title">Login dulu ya kakak.</h2>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                name="email"
                                value={email}
                                onChange={handleEmailInput}
                                focus="true" />
                            {/* {validator.message('email', email, 'required')} */}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordInput} />
                            {/* {validator.message('password', password, 'required')} */}
                        </Form.Group>

                        <div>
                            {showMessage &&
                                <div>
                                    {
                                        msgStatus ?
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

            {/* {msgStatus && fireRedirect && (
                // <Redirect
                //     wait={2000}
                //     to={'/'} />
            )} */}

        </Container>
    );

}

LoginForm.propTypes = {
    // clearLapakForm: PropTypes.func.isRequired,
    // handleLapakFormSubmit: PropTypes.func.isRequired,
    // toggleLapakForm: PropTypes.func.isRequired,
};

export default LoginForm;