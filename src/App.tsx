import FullPageWaiting from "./app/FullPageWaiting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/login/page";
import Patientchat from "./app/chat/PatientChat";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={<FullPageWaiting />}
          />
          <Route
            path="/chat"
            element={<Patientchat />}
          />
          <Route
            path="/"
            element={<LoginPage />}
          />
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
    </>
  );
}

export default App;
