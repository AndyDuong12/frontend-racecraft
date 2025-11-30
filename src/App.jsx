import { useState } from "react";
import NavBar from "./components/navbar.jsx";
import MainContent from "./components/mainContent.jsx";

import "./styles.css";

export default function App() {
  const [activeView, setActiveView] = useState("drivers");

  return (
    <div className="min-h-screen text-neutral-50 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <NavBar activeView={activeView} onChangeView={setActiveView} />
        <MainContent activeView={activeView} />
      </div>
    </div>
  );
}
