// src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const PopupContent = styled.div`
  text-align: center;
`;

const CountryName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Flag = styled.img`
  width: 100px;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const Map = ({ location, ip, localTime }) => {
  const [countryInfo, setCountryInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const position = [location.lat, location.lng];

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        if (location.country) {
          const countryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${location.country}`);
          if (countryResponse.data && countryResponse.data.length > 0) {
            setCountryInfo(countryResponse.data[0]);
          } else {
            console.error('Country data not found');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
    };

    fetchCountryInfo();
  }, [location.country]);

  if (loading) return <div>Loading...</div>;

  return (
    <MapWrapper>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <PopupContent>
              {countryInfo.name && (
                <>
                  <CountryName>{countryInfo.name.common}</CountryName>
                  {countryInfo.flags && countryInfo.flags.png && (
                    <Flag src={countryInfo.flags.png} alt={`${countryInfo.name.common} flag`} />
                  )}
                  <InfoContainer>
                    <div>IP Address: {ip}</div>
                    <div>Local Time: {localTime}</div>
                  </InfoContainer>
                </>
              )}
            </PopupContent>
          </Popup>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
