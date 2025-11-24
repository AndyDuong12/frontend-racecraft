import { useState, useEffect } from "react";

export default function DriverWinsAPI() {
  const BASEURL = "https://api.openf1.org/v1"; // API url

  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to set timeout (To delay requests to avoid many request limit exceeded)
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // This function will increase the delay whenever we get rate limit exceeded
  async function fetchWithBackoff(url, retries = 5, delay = 1000) {
    try {
      const res = await fetch(url);

      // Rate limited
      if (res.status === 429) {
        if (retries === 0) throw new Error("Rate limit exceeded.");
        await sleep(delay);
        return fetchWithBackoff(url, retries - 1, delay * 1.5); // exponential backoff
      }

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount

    // Function to fetch wins on races per driver
    const fetchWinsRacesDriver = async () => {
      try {
        // 1. Fetch all sessions
        const sessionRes = await fetch(`${BASEURL}/sessions`);
        const sessions = await sessionRes.json();

        // Filter sessions with "race" only
        const raceSessions = sessions.filter((s) => s.session_type === "Race");

        const winCounts = {};

        // Get the session key
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
          let winner = null;
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

          // Get the driver number
          const driverNum = winner.driver_number;
          winCounts[driverNum] = (winCounts[driverNum] || 0) + 1;
          //console.log(`Attempt`);
        }
        //console.log(winCounts);

        // Fetch driver info to get names
        const driverRes = await fetch(`${BASEURL}/drivers`);
        const drivers = await driverRes.json();
        const driverMap = {};
        for (const d of drivers) {
          driverMap[d.driver_number] = d.full_name;
        }

        // Final result
        const result = Object.entries(winCounts).map(([num, wins]) => ({
          driver_number: num,
          name: driverMap[num] || "Unknown",
          wins,
        }));

        // Set state only if the component is mounted
        if (isMounted) {
          setWins(result);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWinsRacesDriver();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sort wins by descending by number of wins
  const sortedWins = [...wins].sort((a, b) => b.wins - a.wins);

  // console.log() for debugging
  useEffect(() => {
    console.log(sortedWins);
  }, [sortedWins]);

  return { sortedWins, loading };
}
