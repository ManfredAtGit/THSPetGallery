import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoGallery from './components/PhotoGallery';
import ThemeToggle from './components/ThemeToggle';
import animals from './data/animals.json';

const App = () => {
  const [sortBy, setSortBy] = useState('id');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedPetType, setSelectedPetType] = useState('all');

  // Get unique countries and pet types from data
  const countries = ['all', ...new Set(animals.map(item => item.country))];
  const petTypes = ['all', ...new Set(animals.map(item => item.type))];

  // Filter data based on both selected country and pet type
  const filteredData = animals
    .filter(item => selectedCountry === 'all' || item.country === selectedCountry)
    .filter(item => selectedPetType === 'all' || item.type === selectedPetType);

  return (
    <Container>
      <h1>Pet Foto Gallery</h1>
      <Header>
        <ThemeToggle />
        <SortingControl>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </SortingControl>
        <FilterControl>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map(country => (
              <option key={country} value={country}>
                {country === 'all' ? 'All Countries' : country}
              </option>
            ))}
          </select>
        </FilterControl>
        <FilterControl>
          <select value={selectedPetType} onChange={(e) => setSelectedPetType(e.target.value)}>
            {petTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Pets' : type}
              </option>
            ))}
          </select>
        </FilterControl>
      </Header>
      <PhotoGallery data={filteredData} sortBy={sortBy} />
    </Container>
  );
};

// Updated styled components
const FilterControl = styled.div`
  select {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;

const SortingControl = styled(FilterControl)``;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    
    select {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export default App;
