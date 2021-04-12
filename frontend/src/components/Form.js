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
            lapak_name: '' || 'Fulan',
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
            element: message => <div className="invalid-msg"><small>{message}</small></div>
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);
        console.log('hey submit', this.state)
        var auth = localStorage.getItem('accessToken');
        console.log(auth)


        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ fireRedirect: false });
        }

        fetch('/lapaks/', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + auth,
            },
            // We convert the React state to JSON and send it as the POST body
        })
        .then(function (response) {
            if (!response.ok) {
                console.log('It\'s NOT working. ');
            }
            // console.log('is it working?')
            // console.log(response)
            // this.setState({ msgStatus: true });
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
                    className="LapakForm"
                    onSubmit={this.handleSubmit}>


                    <Form.Row>
                        <Form.Group as={Col} md={{span:8, offset: 2}}>
                            <h2 className="h1-title">Tambahkan Lapak</h2>
                            <Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text"
                                    name="lapak_name"
                                    value={this.state.lapak_name}
                                    onChange={this.handleChange}
                                    placeholder="Nama si fulan (jika diketahui)" />
                                <Form.Text muted>Ubah bagian ini jika kamu tau nama beliau.</Form.Text>
                                {this.validator.message('lapak_name', this.state.lapak_name, 'alpha')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Jenis Lapak</Form.Label>
                                <Form.Control type="text"
                                    name="lapak_type"
                                    value={this.state.lapak_type}
                                    onChange={this.handleChange} />
                                <Form.Text muted>ex: peyek, bakso, dll</Form.Text>
                                {this.validator.message('lapak_type', this.state.lapak_type, 'required|alpha')}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    />
                                <Form.Text muted>Alamat / nama jalan atau kawasan kelurahan atau patokan</Form.Text>
                                {this.validator.message('address', this.state.address, 'required|alpha')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kota</Form.Label>
                                <Form.Control type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleChange} />
                                <Form.Text muted>Nama Kota / Kabupaten / Kota Madya</Form.Text>
                                {this.validator.message('city', this.state.city, 'required|alpha')}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sosmed Link Info</Form.Label>
                                <Form.Control type="text"
                                    name="sosmed_link"
                                    value={this.state.sosmed_link}
                                    onChange={this.handleChange} />
                                <Form.Text muted>Link untuk info terkait, misal link FB, IG, lainnya.</Form.Text>
                            </Form.Group>

                            <div>
                                {showMessage &&
                                    <div>
                                        {
                                            this.state.msgStatus ?
                                                <Alert variant="success">Data berhasil ditambahkan.</Alert>
                                                :
                                                <Alert variant="warning"> Failed. Silakan melengkapi data.</Alert>
                                        }
                                    </div>
                                }
                            </div>

                            <Form.Group>
                                <Button variant="primary" type="submit">Kirim</Button>{' '}
                                <Button variant="outline-dark" href="/">Batal</Button>
                            </Form.Group>

                        </Form.Group>
                    </Form.Row>
                </Form>

                {this.state.msgStatus && fireRedirect && (
                    <Redirect
                        wait={2000}
                        to={from || '/addlapak'} />
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