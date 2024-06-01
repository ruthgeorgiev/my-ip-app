// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Sidebar, Header, SubHeader } from './components/Layout';
import Map from './components/Map';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Card as MuiCard, CardContent, Typography, CssBaseline, Select, MenuItem } from '@mui/material';
import GlobalStyles from './components/GlobalStyles';
import './App.css';

const StyledCard = styled(MuiCard)`
  margin: 10px 0;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FlagImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TimeContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const timezones = [
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
  'America/Los_Angeles'
];

const App = () => {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState({});
  const [localTime, setLocalTime] = useState('');
  const [otherTime, setOtherTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const fetchIpAndLocation = async () => {
      try {
        const ipResponse = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`);
        const { ip, location } = ipResponse.data;
        setIp(ip);
        setLocation(location);
        const local = DateTime.now().setZone(location.timezone);
        setLocalTime(local.toFormat('fff'));
        setOtherTime(local.setZone(selectedTimezone).toFormat('fff'));

        if (location.country) {
          const countryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${location.country}`);
          setCountryInfo(countryResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching IP and location:', error);
      }
    };

    fetchIpAndLocation();
  }, [selectedTimezone]);

  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    setSelectedTimezone(newTimezone);
    const local = DateTime.now().setZone(location.timezone);
    setOtherTime(local.setZone(newTimezone).toFormat('fff'));
  };

  if (!location.lat || !location.lng) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <GlobalStyles />
      <Container>
        <Sidebar className="shadow-lg p-3 mb-5 bg-white rounded">
          <Header>IP Location Finder</Header>
          {countryInfo.flags && (
            <FlagImage src={countryInfo.flags.png} alt={`${countryInfo.name.common} flag`} />
          )}
          <StyledCard className="container">
            <CardContent>
              <div className="ip-address">
                <SubHeader>Your IP Information</SubHeader>
                <Typography variant="body2" color="text.secondary">
                  IP Address: {ip}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {location.city}, {location.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Timezone: {location.timezone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Local Time: {localTime}
                </Typography>
                
                {countryInfo.name && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Country: {countryInfo.name.common}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Capital: {countryInfo.capital && countryInfo.capital[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Region: {countryInfo.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Subregion: {countryInfo.subregion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Population: {countryInfo.population}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Native Name: {Object.values(countryInfo.name.nativeName)[0].common}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Language: {Object.values(countryInfo.languages)[0]}
                    </Typography>
                    <TimeContainer>
                  <SubHeader>Time in Another Place</SubHeader>
                  <Select value={selectedTimezone} onChange={handleTimezoneChange}>
                    {timezones.map((timezone) => (
                      <MenuItem key={timezone} value={timezone}>
                        {timezone}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2" color="text.secondary">
                    {otherTime}
                  </Typography>
                </TimeContainer>
                  </>
                  
                )}
              </div>
            </CardContent>
          </StyledCard>
        </Sidebar>
        <Map location={location} ip={ip} localTime={localTime} />
      </Container>
    </>
  );
};

export default App;
