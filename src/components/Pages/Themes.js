import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/darkMode';
import { BiMoon, BiSun } from 'react-icons/bi';
import { Button } from 'react-bootstrap';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: darkMode ? 'black' : 'blue',
  });

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    setButtonStyle({
      backgroundColor: darkMode ? 'blue' : 'black',
    });
  };

  return (
    <div>
      <Button onClick={handleToggle} style={buttonStyle}>
        {darkMode ? <BiMoon /> : <BiSun />}
      </Button>
    </div>
  );
};

export default DarkModeToggle;
