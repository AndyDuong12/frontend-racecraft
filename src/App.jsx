import { useState, useMemo } from "react";
import NavBar from "./components/navbar.jsx";
import MainContent from "./components/mainContent.jsx";

import "./styles.css";

export default function App() {
  const [activeView, setActiveView] = useState("drivers");

  // Lift selected drivers from the cards
  const [selectedDrivers, setSelectedDrivers] = useState({
    card1: null,
    card2: null,
  });

  // Lift selected constructors from the cards
  const [selectedConstructors, setSelectedConstructors] = useState({
    card1: null,
    card2: null,
  });

  // "Driver A vs Driver B"
  const driverVsLabel = useMemo(() => {
    const d1 = selectedDrivers.card1?.name;
    const d2 = selectedDrivers.card2?.name;

    if (d1 && d2) return `${d1} vs ${d2}`;
    if (d1 || d2) return d1 || d2;
    return "Choose drivers to compare";
  }, [selectedDrivers]);

  // "Team A vs Team B"
  const constructorVsLabel = useMemo(() => {
    const c1 = selectedConstructors.card1?.teamName;
    const c2 = selectedConstructors.card2?.teamName;

    if (c1 && c2) return `${c1} vs ${c2}`;
    if (c1 || c2) return c1 || c2;
    return "Choose teams to compare";
  }, [selectedConstructors]);

  return (
    <div className="min-h-screen text-neutral-50 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <NavBar
          activeView={activeView}
          onChangeView={setActiveView}
          driverVsLabel={driverVsLabel}
          constructorVsLabel={constructorVsLabel}
        />
        <MainContent
          activeView={activeView}
          selectedDrivers={selectedDrivers}
          setSelectedDrivers={setSelectedDrivers}
          selectedConstructors={selectedConstructors}
          setSelectedConstructors={setSelectedConstructors}
        />
      </div>
    </div>
  );
}
