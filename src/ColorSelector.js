import React from 'react';

const ColorSelector = ({ selectedColor, onColorChange }) => {
  const handleChange = (event) => {
    onColorChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="colorPicker">Choose a color : </label>
      <input
        type="color"
        id="colorPicker"
        value={selectedColor}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorSelector;
