import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dcanvas from '/src/components/DCanvas'
import Home from '/src/components/Home';
function App() {
    return (
        <div className="App"
            style={{
                width: '100vw',
                height: 'calc(100vh - 80px)',
            }}
        >  
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dcanvas" element={<Dcanvas/>}/>
            
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
