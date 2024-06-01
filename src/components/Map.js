// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

// Custom marker icon using Lordicon
const lordiconHtml = `
  <lord-icon
    src="https://cdn.lordicon.com/tdtlrbly.json"
    trigger="hover"
    colors="primary:#121331,secondary:#ee6d66"
    style="width:50px;height:50px">
  </lord-icon>
`;

const greenIcon = new L.DivIcon({
  html: lordiconHtml,
  className: 'custom-div-icon',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
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

const InfoContainer = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const Map = ({ location, ip, localTime }) => {
  if (!location.lat || !location.lng) {
    return <div>Loading map...</div>;
  }

  const position = [location.lat, location.lng];

  return (
    <MapWrapper>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position} icon={greenIcon}>
          <Popup>
            <PopupContent>
              <InfoContainer>
                <div>IP Address: {ip}</div>
                <div>Local Time: {localTime}</div>
              </InfoContainer>
            </PopupContent>
          </Popup>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
