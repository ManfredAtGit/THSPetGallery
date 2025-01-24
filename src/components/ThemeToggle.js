import React, { useState, useEffect } from 'react';
//import './styles.css'; // Import the CSS file
import styled from 'styled-components';
import '../../public/css/styles.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('bright-mode');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'bright-mode' ? 'dark-mode' : 'bright-mode'));
  };

  return (
    <Button onClick={toggleTheme}>
      Switch to {theme === 'bright-mode' ? 'Dark Mode' : 'Bright Mode'}
    </Button>
  );
};

const Button = styled.button`
  margin-bottom: 10px; /* Add margin to the bottom */
`

export default ThemeToggle;
