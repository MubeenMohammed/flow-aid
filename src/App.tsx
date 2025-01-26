import FullPageWaiting from "./app/FullPageWaiting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/login/page";
import Patientchat from "./app/chat/PatientChat";
import GamesPage from "./app/games/GamesPage";

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
            element={<GamesPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
