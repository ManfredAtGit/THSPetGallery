import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import animals from './data/animals.json';

const App = () => {
  return (
    <div>
      <h1>Pet Photo Gallery</h1>
      <PhotoGallery data={animals} />
    </div>
  );
};

export default App;