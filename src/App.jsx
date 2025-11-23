import { useState } from "react";
import NavBar from "./components/navbar.jsx";
import MainContent from "./components/mainContent.jsx";

import "./styles.css";

export default function App() {
  const [activeView, setActiveView] = useState("drivers");

  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  async function fetchWithBackoff(url, retries = 5, delay = 400) {
    try {
      const res = await fetch(url);

      if (res.status === 429) { // Rate limited
        if (retries === 0) throw new Error("Rate limit exceeded.");
        await sleep(delay);
        return fetchWithBackoff(url, retries - 1, delay * 1.5);   // exponential backoff
      }

      return res
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const BASEURL = "https://api.openf1.org/v1";
  const fetchData = async () => {
    try {
      // 1. Fetch sessions
      const sessionRes = await fetch(`${BASEURL}/sessions`);
      const sessions = await sessionRes.json();

      const raceSessions = sessions.filter((s) => s.session_type === "Race");

      const winCounts = {};

      for (const race of raceSessions) {
        const sessionKey = race.session_key;

        // Fetch the results for this session
        const resultRes = await fetchWithBackoff(
          `${BASEURL}/session_result?session_key=${sessionKey}`
        );
        const results = await resultRes.json();

        // Make sure results is an array
        if (!Array.isArray(results)) {
          console.warn(
            "Skipping session, result is not an array:",
            sessionKey,
            results
          );
          continue;
        }

        // Find the winner (position = 1)
        let winner = null
        for (const r of results) {
          if (r.position === 1) {
            winner = r;
            break;
          }
        }

        if (!winner) {
          console.warn("No winner in session:", sessionKey);
          continue;
        }

        const driverNum = winner.driver_number;
        winCounts[driverNum] = (winCounts[driverNum] || 0) + 1;
        console.log(`Attempt`)
      }
      //console.log(winCounts);

      // Fetch driver info to get names
      const driverRes = await fetch(`${BASEURL}/drivers`);
      const drivers = await driverRes.json()
      const driverMap = {};
      for (const d of drivers) {
        driverMap[d.driver_number] = d.full_name;
      }

      // Final result
      const result = Object.entries(winCounts).map(([num, wins]) => ({
        driver_number: num,
        name: driverMap[num] || "Unknown",
        wins
      }))

      console.log(result)
      return result
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  return (
    <div className="min-h-screen text-neutral-50 bg-neutral-800 p-6">
      <NavBar activeView={activeView} onChangeView={setActiveView} />
      <MainContent activeView={activeView} />
    </div>
  );
}
