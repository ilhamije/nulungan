import React from 'react';
import {Card} from 'react-bootstrap';
import './CardStyle.css';
import PropTypes from 'prop-types';

const MyCard = ({ lapak, activeLapak, setActiveLapak }) => {
    const { address, city,
        // picture,
        index, lapak_name, lapak_type } = lapak;

        return (
        <Card
            // style={{ width: '16rem' }}
            className={`${lapak === activeLapak ? 'card-active' : 'card-inactive'} mystyle`}
            id={`card-${index}`}
            onClick={() => setActiveLapak(lapak, false)}
        >
            {/* <div className="row no-gutter"> */}
            <div>
                {/* <div class="col-md-4 center"> */}
                    {/* <Card.Img src={picture} alt={city} className="card-img" /> */}
                {/* </div> */}
                {/* <div class="col-md-4"> */}
                <div>
                    <Card.Header
                        className={`${lapak === activeLapak ? 'card-active-title' : ''}`}
                    >
                            {lapak_name.toUpperCase()} | {lapak_type}
                    </Card.Header>
                </div>
                {/* <div class="col-md-4 center"> */}
                <div>
                    <Card.Body>
                        <Card.Text>
                            {/* {index + 1}<br /> */}
                            {address}<br />
                            {city}<br />
                        </Card.Text>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
};

MyCard.propTypes = {
    lapak: PropTypes.object.isRequired,
    activeLapak: PropTypes.object.isRequired,
    // setActiveProperty: PropTypes.func.isRequired,
};

export default MyCard;
