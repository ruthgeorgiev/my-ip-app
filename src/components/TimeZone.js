// src/components/TimeZone.js
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';
import { Card, Header, Text } from './Layout';

const TimeZone = () => {
  const [timeInfo, setTimeInfo] = useState({});

  useEffect(() => {
    const fetchTimeZone = async () => {
      try {
        const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`);
        const { location } = response.data;

        const currentTime = DateTime.now().setZone(location.timezone);
        const otherTime = DateTime.now().setZone('America/New_York');

        setTimeInfo({
          localTime: currentTime.toLocaleString(DateTime.DATETIME_FULL),
          otherTime: otherTime.toLocaleString(DateTime.DATETIME_FULL),
        });
      } catch (error) {
        console.error('Error fetching timezone info:', error);
      }
    };

    fetchTimeZone();
  }, []);

  return (
    <Card>
      <Header>Timezone Information</Header>
      <Text>Local Time: {timeInfo.localTime}</Text>
      <Text>New York Time: {timeInfo.otherTime}</Text>
    </Card>
  );
};

export default TimeZone;
