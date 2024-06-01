// src/components/IpAddress.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Header, Text } from './Layout';

const IpAddress = () => {
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`);
        setIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIp();
  }, []);

  return (
    <Card>
      <Header>Your IP Address</Header>
      <Text>{ip}</Text>
    </Card>
  );
};

export default IpAddress;
