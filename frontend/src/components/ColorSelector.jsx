import PropTypes from 'prop-types'

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

ColorSelector.propTypes = {
    selectedColor: PropTypes.string,
    onColorChange: PropTypes.any,
}

export default ColorSelector;
