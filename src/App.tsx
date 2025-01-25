import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FullPageWaiting from "./app/FullPageWaiting";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FullPageWaiting />
    </>
  );
}

export default App;
