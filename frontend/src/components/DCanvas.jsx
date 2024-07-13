import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import GuessWord from './GuessWord';

const Dcanvas = () => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial color is black
    const [undoStack, setUndoStack] = useState([]); // State to store canvas states for undo
    const [redoStack, setRedoStack] = useState([]); // State to store canvas states for redo
    const guessWord = 'Subhadra';
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
    })
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
          // Cancel the event
          event.preventDefault();
          // Chrome requires returnValue to be set
          event.returnValue = '';
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
      
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setContext(ctx);
    }, [dimensions]);


    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth * 0.8,
                height: window.innerHeight * 0.8,
            })
        }
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

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
        event.preventDefault();
        if (context) {
            saveCanvasState();
            const { offsetX, offsetY } = getCoords(event);
            context.strokeStyle = selectedColor;
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setDrawing(true);
        }
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        if (drawing && context) {
            const { offsetX, offsetY } = getCoords(event);
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
    const handleClearCanvas = () => {
        if (context) {
            saveCanvasState();
            const canvas = canvasRef.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'white';
        }
    };
    const getCoords = (event) => {
        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
            const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;

            return { offsetX, offsetY };
        } else {

            const { offsetX, offsetY } = event.nativeEvent;
            return { offsetX, offsetY };
        }
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center p-3 w-full'><GuessWord inputString={guessWord} /></div>
                <div className='flex flex-row'>
                    <canvas
                        ref={canvasRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        className="border-t-2 border-l-2  border-b-2 border-gray-900 rounded-l-lg"
                    />
                    <div className='border-t-2 border-r-2  border-b-2 border-gray-900 bg-gradient-to-r from-gray-400 to-gray-900 rounded-r-lg text-white w-20 flex-shrink-0 flex flex-col items-center justify-center p-4'>
                        <button className="text-white p-2" onClick={handleUndo} disabled={undoStack.length === 0} >
                            <FontAwesomeIcon icon={faUndo} />
                        </button>
                        <button className="text-white p-2 " onClick={handleRedo} disabled={redoStack.length === 0} >
                            <FontAwesomeIcon icon={faRedo} />
                        </button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-red-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#f87171')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-green-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#4ade80')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-blue-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#60a5fa')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-yellow-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#facc15')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-black" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#000')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-pink-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#f472b6')}></button>
                        <button className="mb-5 rounded-full ring-2 ring-gray-200 bg-purple-400" style={{ width: '30px', height: '30px' }} onClick={() => setSelectedColor('#c084fc')}></button>
                        <button className="px-2 py-1 font-semibold text-xs a-center ring-2 hover:ring-4 ease-in-out duration-300 ring-teal-400 rounded-lg bg-slate-800 text-slate-200 tracking-widest uppercase" onClick={handleClearCanvas} >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dcanvas;
