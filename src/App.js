// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Sidebar, Header, SubHeader } from './components/Layout';
import Map from './components/Map';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Card as MuiCard, CardContent, Typography, CssBaseline } from '@mui/material';
import GlobalStyles from './components/GlobalStyles';
import './App.css';

const StyledCard = styled(MuiCard)`
  margin: 10px 0; /* Reduced margin */
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState({});
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const fetchIpAndLocation = async () => {
      try {
        const ipResponse = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`);
        const { ip, location } = ipResponse.data;
        setIp(ip);
        setLocation(location);
        setLocalTime(DateTime.now().setZone(location.timezone).toFormat('fff'));
      } catch (error) {
        console.error('Error fetching IP and location:', error);
      }
    };

    fetchIpAndLocation();
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalStyles />
      <Container>
        <Sidebar>
          <Header>IP Location Finder</Header>
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
