import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
// import './App.css';

import data from './data/LapakPoint.json';
import Header from './components/Header';
import Card from './components/Card';

import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lapaks: data,
      activeLapak: data[0],
      // filterIsVisible: false,
      filterCity: 'any',
      filteredLapaks: [],
      isFiltering: false
    };

    this.setActiveLapak = this.setActiveLapak.bind(this);
    // this.toggleFilter = this.toggleFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.filterLapaks = this.filterLapaks.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    fetch("/lapak_list")
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

  filterLapaks() {
    const { lapaks, filterCity } = this.state;
    const isFiltering = filterCity !== 'any';

    const getFilteredLapaks = (lapaks) => {
      const filteredLapaks = [];

      lapaks.forEach(lapak => {
        const { city } = lapak;

        const match =
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
    } = this.state;
    const lapakList = isFiltering ? filteredLapaks : lapaks;

    return (
      <Container>
        <Row>
          <Col md={5}>
            <Header
              // filterIsVisible={filterIsVisible}
              // toggleFilter={this.toggleFilter}
              handleFilterChange={this.handleFilterChange}
              clearFilter={this.clearFilter}
            />

            <div className="cards container">
              <div>
              {
                lapakList.map(lapak => <Card
                  key={lapak._id}
                  lapak={lapak}
                  activeLapak={activeLapak}
                  setActiveLapak={this.setActiveLapak}
                />)
              }
              {
                (isFiltering && lapakList.length === 0) && <p className="warning">No properties were found</p>
              }
              </div>
            </div>
          </Col>
          <Col md={7}>
            this section is for Google Maps
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
