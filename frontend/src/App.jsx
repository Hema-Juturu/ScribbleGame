import { BrowserRouter, Routes, Route } from "react-router-dom";
// import background from "/src/assets/bgImg.jpg";
import Home from '/src/pages/Home';
import Dcanvas from '/src/pages/DCanvas'
import Channel from '/src/pages/Channel';

function App() {
    return (
        <div className="App"
            style={{
                width: '100vw',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                // backgroundImage: `URL(${background})`,
            }}
        >
            <div
                style={{
                    width: '100vw',
                    height: 'calc(80vh)',
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
