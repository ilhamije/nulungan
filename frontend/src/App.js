import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
// import './App.css';

import data from './data/LapakPoint.json';
import Header from './components/Header';
import Card from './components/Card';
import LapakForm from './components/Form';
import MyNav from './components/Nav';

import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lapaks: data,
      activeLapak: data[0],
      // filterIsVisible: false,
      lapakFormIsVisible: false,
      filterLapakType: 'any',
      filterAddress: 'any',
      filterCity: 'any',
      filteredLapaks: [],
      isFiltering: false
    };

    this.setActiveLapak = this.setActiveLapak.bind(this);
    // this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleLapakForm = this.toggleLapakForm.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.filterLapaks = this.filterLapaks.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    // this.handleLapakFormSubmit = this.handleLapakFormSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/lapaks')
      .then((res) => res.json())
      .then((restext) => this.setState({ lapaks: restext, activeLapak: restext[0] }))
  }

  handleFilterChange(e) {
    const target = e.target;
    const { value, name } = target;
    console.log(`${value} ${name}`)
    this.setState({
      [name]: value,
    }, function () {
      this.filterLapaks();
    });
  }

  // handleLapakFormSubmit(e) {
  //   // const target = e.target;
  //   // const { value, name } = target;
  //   // console.log(`${value} ${name}`)
  //   console.log('ehehehehey')
  //   // this.setState({
  //   //   [name]: value,
  //   // }, function () {
  //   //   this.filterLapaks();
  //   // });
  // }

  filterLapaks() {
    const { lapaks, filterLapakType, filterAddress, filterCity } = this.state;
    const isFiltering = filterCity !== 'any' ||
      filterLapakType !== 'any' ||
      filterAddress !== 'any';

    const getFilteredLapaks = (lapaks) => {
      const filteredLapaks = [];

      lapaks.forEach(lapak => {
        const { lapak_type, address, city } = lapak;

        const match =
        (lapak_type.toLowerCase().includes(filterLapakType.toLowerCase()) || filterLapakType === 'any') &&
        (address.toLowerCase().includes(filterAddress.toLowerCase()) || filterAddress === 'any') &&
        (city.toLowerCase().includes(filterCity.toLowerCase()) || filterCity === 'any');

        match && filteredLapaks.push(lapak);
      });

      return filteredLapaks;
    };

    this.setState({
      filteredLapaks: getFilteredLapaks(lapaks),
      activeLapak: getFilteredLapaks(lapaks)[0] || lapaks[0],
      isFiltering,
    });
  }

  // toggleFilter(e) {
  //   e.preventDefault();
  //   this.setState({
  //     filterIsVisible: !this.state.filterIsVisible,
  //   });
  // }

  toggleLapakForm(e) {
    e.preventDefault();
    this.setState({
      lapakFormIsVisible: !this.state.lapakFormIsVisible,
    });
  }

  clearFilter(e, form) {
    e.preventDefault();
    this.setState({
      lapaks: this.state.lapaks.sort((a, b) => a.index - b.index),
      filterCity: 'any',
      // filteredProperties: [],
      // isFiltering: false,
      activeLapak: this.state.lapaks[0],
    });
    form.reset();
  }

  setActiveLapak(lapak, scroll) {
    this.setState({
      activeLapak: lapak,
    });

    const { index } = lapak;

    // Scroll to active property
    if (scroll) {
      const target = `#card-${index}`;
      jump(target, {
        duration: 800,
        easing: easeInOutCubic,
      });
    }
  }


  render() {
    const {
      lapaks,
      activeLapak,
      // filterIsVisible,
      filteredLapaks,
      isFiltering,
      lapakFormIsVisible,
    } = this.state;
    const lapakList = isFiltering ? filteredLapaks : lapaks;

    return (
      <Container fluid>
        <Switch>
          <Route path="/addlapak" component={LapakForm} />
        </Switch>
        <MyNav />
        <Row>
          <Col md={3}>
            <Header
              // filterIsVisible={filterIsVisible}
              // toggleFilter={this.toggleFilter}
              handleFilterChange={this.handleFilterChange}
              clearFilter={this.clearFilter}
              />

            <div className={`${lapakFormIsVisible ? 'invisible' : ''}`}>
              <LapakForm
                toggleLapakForm={this.toggleLapakForm}
                lapakFormIsVisible={lapakFormIsVisible} />
            </div>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={this.toggleLapakForm}>Add Data</Button>
            {/* <div className="cards container"> */}
              <div>
              {
                lapakList.map(lapak => <Card
                  key={lapak.id}
                  lapak={lapak}
                  activeLapak={activeLapak}
                  setActiveLapak={this.setActiveLapak}
                />)
              }
              {
                (isFiltering && lapakList.length === 0) && <p className="warning">No properties were found</p>
              }
              </div>
            {/* </div> */}
          </Col>
          <Col md={9}>
            this section is for Google Maps
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
