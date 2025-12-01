// src/api/constructors/constructorSeasonWinsAPI.jsx
import { useEffect, useState } from "react";

const SEASONS = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const TARGET_CONSTRUCTORS = [
  "Red Bull Racing",
  "McLaren",
  "Mercedes",
  "Ferrari",
];

// Manually seeded Monza winners by constructor
// (only used when the API doesn't already give us a win for that year)
const SEEDED_MONZA_WINNERS = {
  2018: "Mercedes",
  2019: "Ferrari",
  2020: null, // no race at Monza in this data set / left blank
  2021: "McLaren",
  2022: "Red Bull Racing",
  2023: "Red Bull Racing",
  2024: "Ferrari",
};

export default function useConstructorSeasonWinsAPI() {
  const [seasonWins, setSeasonWins] = useState(null);
  const [loadingSeasonWins, setLoadingSeasonWins] = useState(true);
  const [errorSeasonWins, setErrorSeasonWins] = useState(null);

  useEffect(() => {
    const fetchSeasonWins = async () => {
      try {
        setLoadingSeasonWins(true);

        const resultsBySeason = {};

        for (const year of SEASONS) {
          // 1) Get Monza race sessions for that year
          const sessionsRes = await fetch(
            `https://api.openf1.org/v1/sessions?year=${year}&session_type=Race&location=Monza`
          );
          const sessions = await sessionsRes.json();

          if (!sessions.length) {
            resultsBySeason[year] = {};
            continue;
          }

          const sessionKeys = sessions.map((s) => s.session_key);
          const sessionsQuery = sessionKeys
            .map((key) => `session_key=${key}`)
            .join("&");

          // 2) For those sessions, grab P1 finishers
          const winnersRes = await fetch(
            `https://api.openf1.org/v1/session_result?${sessionsQuery}&position=1`
          );
          const winners = await winnersRes.json();

          if (!winners.length) {
            resultsBySeason[year] = {};
            continue;
          }

          // 3) Map driver_number -> team_name using /drivers
          const driverNumbers = [
            ...new Set(winners.map((w) => w.driver_number)),
          ];
          const driversQuery = driverNumbers
            .map((n) => `driver_number=${n}`)
            .join("&");

          // Use one session_key just to scope the driver lookup
          const driversRes = await fetch(
            `https://api.openf1.org/v1/drivers?${driversQuery}&session_key=${sessionKeys[0]}`
          );
          const drivers = await driversRes.json();

          const teamByDriver = {};
          drivers.forEach((d) => {
            teamByDriver[d.driver_number] = d.team_name;
          });

          // 4) Count wins per constructor, only for our target list
          const yearCounts = {};

          winners.forEach((w) => {
            const teamName = teamByDriver[w.driver_number];
            if (!teamName) return;
            if (!TARGET_CONSTRUCTORS.includes(teamName)) return;

            yearCounts[teamName] = (yearCounts[teamName] || 0) + 1;
          });

          resultsBySeason[year] = yearCounts;
        }

        // 5) Manual seeding of historical Monza winners
        for (const [yearStr, teamName] of Object.entries(
          SEEDED_MONZA_WINNERS
        )) {
          if (!teamName) continue;
          if (!TARGET_CONSTRUCTORS.includes(teamName)) continue;

          const year = Number(yearStr);
          if (!resultsBySeason[year]) {
            resultsBySeason[year] = {};
          }

          // If the API already gave us any wins for our target teams
          // this year, don't add a manual one (avoids double-counting).
          const hasAnyTargetWin = Object.entries(resultsBySeason[year]).some(
            ([team, count]) =>
              TARGET_CONSTRUCTORS.includes(team) && (count || 0) > 0
          );
          if (hasAnyTargetWin) continue;

          resultsBySeason[year][teamName] =
            (resultsBySeason[year][teamName] || 0) + 1;
        }

        setSeasonWins(resultsBySeason);
      } catch (err) {
        console.error("Error fetching season wins", err);
        setErrorSeasonWins(err);
      } finally {
        setLoadingSeasonWins(false);
      }
    };

    fetchSeasonWins();
  }, []);

  return { seasonWins, loadingSeasonWins, errorSeasonWins, seasons: SEASONS };
}
