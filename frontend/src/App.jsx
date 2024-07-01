
import Dcanvas from '/src/components/DCanvas'

function App() {
  return (
    <div className="App bg-slate-600"
      style={{
        width: '100vw',
        height: 'calc(100vh - 80px)',
      }}
    >
      <Dcanvas />
    </div>
  );
}

export default App
