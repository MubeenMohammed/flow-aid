import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FullPageWaiting from "./app/FullPageWaiting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullPageWaiting />} />
        <Route 
          path="/games" 
          element={
            <div className="h-screen flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Games Page Coming Soon
              </h1>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
