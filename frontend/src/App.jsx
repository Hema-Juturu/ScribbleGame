import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dcanvas from '/src/components/DCanvas'
import Home from '/src/components/Home';
import background from "/src/assets/bgImg.jpg";
import Channel from '/src/components/Channel';

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
                        <Route path="/dcanvas/:channelId" element={<Dcanvas />} />
                        <Route path="/channel" element={<Channel/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App
