// src/components/Layout.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: absolute;
  left: 40px; /* Adjusted from 20px to 40px */
  top: 50%;
  transform: translateY(-50%); /* Center vertically */
`;

export const Header = styled.h1`
  font-size: 20px; /* Reduced font size */
  margin-bottom: 10px; /* Reduced margin */
  text-align: center;
  color: #333;
`;

export const SubHeader = styled.h2`
  font-size: 16px; /* Reduced font size */
  margin-bottom: 10px; /* Reduced margin */
  text-align: center;
  color: #666;
`;

export const Text = styled.p`
  margin: 0;
  color: #777;
`;
