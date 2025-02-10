//import React from 'react';
import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoGallery from './components/PhotoGallery';
import ThemeToggle from './components/ThemeToggle';
import animals from './data/animals.json';

const App = () => {

  const [sortBy, setSortBy] = useState('id');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Get unique countries from data
  const countries = ['all', ...new Set(animals.map(item => item.country))];

  // Filter data based on selected country
  const filteredData = selectedCountry === 'all' 
    ? animals 
    : animals.filter(item => item.country === selectedCountry);

  return (
    <Container>
      <h1>Pet Photo Gallery</h1>
      <Header>
        <ThemeToggle />
        <SortingControl>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </SortingControl>
        <CountryControl>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map(country => (
              <option key={country} value={country}>
                {country === 'all' ? 'All Countries' : country}
              </option>
            ))}
          </select>
        </CountryControl>
      </Header>
      <PhotoGallery data={filteredData} sortBy={sortBy} />
    </Container>
  );

/*
  return (
    <Container>
      <h1>Pet Photo Gallery</h1>
      <Header>
        <ThemeToggle />
        <SortingControl>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </SortingControl>
      </Header>
      <PhotoGallery data={animals} sortBy={sortBy} />
    </Container>
  );
*/

};


const SortingControl = styled.div`
  select {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;

const CountryControl = styled(SortingControl)``;

/*
const SortingControl = styled.div`
  select {
    padding: 4px 8px;
    font-size: 0.9rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 4px;
    transition: all 0.3s ease;
    cursor: default;

    &:hover {
      background: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.body};
    }

    option {
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
  }
`;
*/

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export default App;


