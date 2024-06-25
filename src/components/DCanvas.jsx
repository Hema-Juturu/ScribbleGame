import { useRef, useState, useEffect } from 'react'
import ColorSelector from '/src/components/ColorSelector'

const Dcanvas = () => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial color is black

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setContext(context);
    }, []);

    const handleMouseDown = (event) => {
        if (context) {
            const { offsetX, offsetY } = event.nativeEvent;
            context.strokeStyle = selectedColor;
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setDrawing(true);
        }
    };

    const handleMouseMove = (event) => {
        if (drawing && context) {
            const { offsetX, offsetY } = event.nativeEvent;
            context.lineTo(offsetX, offsetY);
            context.stroke();
        }
    };

    const handleMouseUp = () => {
        if (drawing && context) {
            context.closePath();
            setDrawing(false);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const handleClearCanvas = () => {
        if (context) {
            const canvas = canvasRef.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'white';
        }
    };
    return (
        <div>
            <div style={{ display: 'flex', padding: '1em', justifyContent: 'space-evenly' }}>
                <ColorSelector selectedColor={selectedColor} onColorChange={handleColorChange} />
                <button onClick={handleClearCanvas}>Clear</button>
            </div>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default Dcanvas;
