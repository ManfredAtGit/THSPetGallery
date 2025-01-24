import React from 'react';
import PhotoGallery from './components/PhotoGallery';
<<<<<<< HEAD
=======
import ThemeToggle from './components/ThemeToggle';
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
import animals from './data/animals.json';

const App = () => {
  return (
    <div>
      <h1>Pet Photo Gallery</h1>
<<<<<<< HEAD
=======
      <ThemeToggle />
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
      <PhotoGallery data={animals} />
    </div>
  );
};

export default App;