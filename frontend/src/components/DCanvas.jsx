import React, { useRef, useState, useEffect } from 'react';
import ColorSelector from '/src/components/ColorSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

const Dcanvas = () => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial color is black
    const [undoStack, setUndoStack] = useState([]); // State to store canvas states for undo
    const [redoStack, setRedoStack] = useState([]); // State to store canvas states for redo

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setContext(ctx);
    }, []);

    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        undoStack.push(imgData);
        setUndoStack([...undoStack]);
    };

    const handleUndo = () => {
        if (undoStack.length > 0 && context) {
            const lastState = undoStack.pop();
            redoStack.push(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
            setRedoStack([...redoStack]);
            context.putImageData(lastState, 0, 0);
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0 && context) {
            const nextState = redoStack.pop();
            undoStack.push(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
            setUndoStack([...undoStack]);
            context.putImageData(nextState, 0, 0);
        }
    };

    const handleMouseDown = (event) => {
        if (context) {
            saveCanvasState();
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
            saveCanvasState();
            const canvas = canvasRef.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'white';
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', padding: '1em', justifyContent:'space-evenly' }}>
                <ColorSelector selectedColor={selectedColor} onColorChange={handleColorChange} />
                <button onClick={handleUndo} disabled={undoStack.length === 0}><FontAwesomeIcon icon={faUndo} /></button>
                <button onClick={handleRedo} disabled={redoStack.length === 0}><FontAwesomeIcon icon={faRedo}/></button>
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
