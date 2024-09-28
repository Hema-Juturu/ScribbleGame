import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dcanvas from '/src/components/DCanvas'
import Home from '/src/components/Home';
import background from "/src/assets/bgImg.jpg";

function App() {
    return (
        <div className="App"
            style={{
                width: '100vw',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `URL(${background})`,
            }}
        >
            <div
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 80px)',
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dcanvas" element={<Dcanvas />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App
