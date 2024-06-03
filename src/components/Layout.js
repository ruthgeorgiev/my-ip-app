// src/components/Layout.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: absolute;
  left: 60px; 
  top: 50%;
  transform: translateY(-50%); 

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    transform: none;
    width: calc(100% - 40px);
    height: auto;
    padding: 10px;
    margin: 10px auto;
  }
`;

export const Header = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
`;

export const SubHeader = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  color: #666;
`;

export const Text = styled.p`
  margin: 0;
  color: #777;
`;
