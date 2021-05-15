import React, { useState } from 'react';
// import { Redirect } from 'react-router'
// import PropTypes from 'prop-types';
import { Container, Col, Form, Button } from 'react-bootstrap';
// import SimpleReactValidator from 'simple-react-validator';
// import jwt from 'jsonwebtoken';
// import useToken from './../useToken';

import './DefaultStyle.css';


function LapakForm() {
    const [lapakName, setLapakName] = useState('Fulan');
    const [lapakType, setLapakType] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [sosmedLink, setSosmedLink] = useState();
    // const [fireRedirect, setFireRedirect] = useState(false);
    // const [showMessage, setShowMessage] = useState(false);
    // const [msgStatus, setmsgStatus] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleAuth = e => {
    //     const token = localStorage.getItem('accessToken');
    //     if (token !== null) {
    //         try {
    //             // jwt.verify(token, '9g+a!g^n@31z_#@1a35vrf)28waw3b5e03xhed9p!p66+ll*)j');
    //             var decoded = jwt.verify(token, '9g+a!g^n@31z_#@1a35vrf)28waw3b5e03xhed9p!p66+ll*)j');
    //             console.log(decoded); // bar
    //             this.setState({ isLoggedIn: true });
    //         } catch (err) {
    //             console.log(err);
    //             this.setState({ isLoggedIn: false });
    //         }
    //     }
    //     console.log('isLoggedIn: ', this.state.isLoggedIn);
    // }



    async function lapakAdd(contents) {
        let auth = localStorage.getItem('accessToken');
        console.log(auth);
        // console.log(contents);

        return fetch('/lapaks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + auth,
            },
            body: JSON.stringify(contents),
        })
    }

    const handleLapakName = e => {
        setLapakName(e.target.value);
    };
    const handleLapakType = e => {
        setLapakType(e.target.value);
    };
    const handleAddress = e => {
        setAddress(e.target.value);
    };
    const handleCity = e => {
        setCity(e.target.value);
    };
    const handleSosmedLink = e => {
        setSosmedLink(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formContent = await lapakAdd({
            lapak_name: lapakName,
            lapak_type: lapakType,
            address: address,
            city: city,
            sosmed_link: sosmedLink
        });
        console.log(formContent);
    }

    return (
        <Container>
            <Form
                style={{ marginBottom: "30px", marginTop: "50px" }}
                className="LapakForm"
                onSubmit={handleSubmit}>


                <Form.Row>
                    <Form.Group as={Col} md={{span:8, offset: 2}}>
                        <h2 className="h1-title">Tambahkan Lapak</h2>
                        <Form.Group>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text"
                                name="lapak_name"
                                value={lapakName}
                                onChange={handleLapakName}
                                placeholder="Nama si fulan (jika diketahui)" />
                            <Form.Text muted>Ubah bagian ini jika kamu tau nama beliau.</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Jenis Lapak</Form.Label>
                            <Form.Control type="text"
                                name="lapak_type"
                                value={lapakType}
                                onChange={handleLapakType} />
                            <Form.Text muted>ex: peyek, bakso, dll</Form.Text>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text"
                                name="address"
                                value={address}
                                onChange={handleAddress}
                                />
                            <Form.Text muted>Alamat / nama jalan atau kawasan kelurahan atau patokan</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Kota</Form.Label>
                            <Form.Control type="text"
                                name="city"
                                value={city}
                                onChange={handleCity} />
                            <Form.Text muted>Nama Kota / Kabupaten / Kota Madya</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Sosmed Link Info</Form.Label>
                            <Form.Control type="text"
                                name="sosmedLink"
                                value={sosmedLink}
                                onChange={handleSosmedLink} />
                            <Form.Text muted>Link untuk info terkait, misal link FB, IG, lainnya.</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">Kirim</Button>{' '}
                            <Button variant="outline-dark" href="/">Batal</Button>
                        </Form.Group>

                    </Form.Group>
                </Form.Row>
            </Form>

        </Container>
    );
}

LapakForm.propTypes = {
    // clearLapakForm: PropTypes.func.isRequired,
    // handleLapakFormSubmit: PropTypes.func.isRequired,
    // toggleLapakForm: PropTypes.func.isRequired,
};

export default LapakForm;