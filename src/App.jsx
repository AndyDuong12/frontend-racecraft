import { useState } from "react";
import NavBar from "./components/navbar.jsx";
import MainContent from "./components/mainContent.jsx";

import "./styles.css";

export default function App() {
  const [activeView, setActiveView] = useState("drivers");

  return (
    <div className="min-h-screen text-neutral-50 bg-neutral-800 p-6">
      <NavBar activeView={activeView} onChangeView={setActiveView} />
      <MainContent activeView={activeView} />
    </div>
  );
}
