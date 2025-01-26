import FullPageWaiting from "./app/FullPageWaiting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/login/page";
import Patientchat from "./app/chat/PatientChat";
import GamesPage from "./app/games/GamesPage";
import SerenityQuest from "./app/games/serenity-quest/SerenityQuest";

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
          <Route
            path="/games/memory"
            element={<div>Memory Game Coming Soon</div>}
          />
          <Route path="/games/serenity-quest" element={<SerenityQuest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
