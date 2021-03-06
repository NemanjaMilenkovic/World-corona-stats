import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./style/App.css";
// import Map from "./components/Map";
import SimpleMap from "./components/SimpleMap";
import Information from "./components/Information";
import News from "./components/News";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Navbar } from "react-bootstrap";
require("dotenv").config();

export default function App() {
  const [allInformation, setAllInformation] = useState([]);

  useEffect(async () => {
    const coronaData = await axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_CORONA_KEY
      }
    });

    let country_state = coronaData.data.countries_stat.filter(inf => {
      return inf.country_name !== "DiamondPrincess";
    });

    const popData = await axios({
      method: "GET",
      url: "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_POP_KEY
      }
    });

    let country_state_including_pop = country_state.map(inf => {
      inf.population = "Missing";
      popData.data.map(popInf => {
        if (popInf.name === inf.country_name) {
          inf.population = (+popInf.population).toLocaleString();
        } else {
          switch (inf.country_name) {
            case "HongKong":
              inf.population = "7,475,077";
              break;
            case "SouthKorea":
              inf.population = "51,253,422";
              break;
            case "UnitedStates":
              inf.population = "330,305,392";
              break;
            case "Macao":
              inf.population = "646,128";
              break;
            case "UnitedKingdom":
              inf.population = "67,757,994";
              break;
            case "UnitedArabEmirates":
              inf.population = "9,847,180";
              break;
            case "SriLanka":
              inf.population = "21,381,056";
              break;
          }
        }
      });
      return inf;
    });
    setAllInformation(country_state_including_pop);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>World Corona Stats</h1>
      </header>

      <Container>
        <Row>
          <Col sm={8}>
            <SimpleMap />
          </Col>
          <Col sm={4}>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand>Information Of Corona</Navbar.Brand>
            </Navbar>
            <div className="scrollbar">
              {allInformation.map(inf => {
                return (
                  <Information
                    key={inf.country_name}
                    country_name={inf.country_name}
                    rate={inf.rate}
                    cases={inf.cases}
                    population={inf.population}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <News />
    </div>
  );
}
