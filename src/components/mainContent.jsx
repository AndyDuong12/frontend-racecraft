import { useState } from "react";
import { useMemo } from "react"; // #

import f1car from "../assets/formula1-car-icon.png"; // Car image on the right

import useDriverWinsAPI from "../api/drivers/driverWinsAPI.jsx"; // API call for 'Wins on Races per Driver'
import useDriverStatsAPI from "../api/drivers/driverStatsAPI.jsx"; // API call for drivers stats
import DriverWinsChart from "../charts/driverWinsChart.jsx"; // Chart for 'Wins on Races per Driver'
import DriverStats from "../charts/driverStats.jsx"; // Driver stats
import ConstructorWinsChart from "../charts/constructorWinsChart.jsx";
import ConstructorStats from "../charts/constructorStats.jsx";

export default function MainContent({ activeView }) {
  // Fetch from API
  const { sortedWins, loadingStatsAPI } = useDriverWinsAPI();
  const { driverDetails, loadingDetails } = useDriverStatsAPI(sortedWins);

  // Track the selected drivers for the 2 stats cards
  const [selectedDrivers, setSelectedDrivers] = useState({
    card1: null,
    card2: null,
  });

  // Selected constructors for the two cards
  const [selectedConstructors, setSelectedConstructors] = useState({
    card1: null,
    card2: null,
  });

  // Group driver wins by team to get constructor wins
  const constructorWins = useMemo(() => {
    // #
    if (!sortedWins || sortedWins.length === 0 || !driverDetails) {
      // #
      return []; // #
    } // #

    const teamMap = new Map(); // #

    sortedWins.forEach((driverWin) => {
      // #
      const details = driverDetails.find(
        // #
        (d) => String(d?.driver_number) === String(driverWin.driver_number) // # updated
      ); // #

      if (!details || !details.team_name) return; // #

      const teamName = details.team_name; // #
      const teamColour = details.team_colour; // #

      const existing = teamMap.get(teamName); // #
      if (existing) {
        // #
        existing.wins += driverWin.wins; // #
      } else {
        // #
        teamMap.set(teamName, {
          // #
          teamName, // #
          teamColour, // #
          wins: driverWin.wins, // #
        }); // #
      } // #
    }); // #

    return Array.from(teamMap.values()).sort((a, b) => b.wins - a.wins); // #
  }, [sortedWins, driverDetails]); // #

  const constructorsLoading = loadingStatsAPI || loadingDetails; // # updated

  // Text that changes between views, layout stays identical
  const isDrivers = activeView === "drivers";
  const bottomMetricLabel = isDrivers
    ? "Lap Time Comparison"
    : "Race Wins per Season";

  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-4 gap-6 w-full px-20">
        {/* Left Chart (same size for both views) */}
        {isDrivers ? (
          <div className="col-span-2 row-span-2 bg-neutral-600 rounded-2xl p-5 min-h-[260px]">
            <h2 className="text-lg text-center mb-4 font-semibold leading-tight h-12 flex items-center justify-center">
              Wins on Races per Driver
            </h2>
            <DriverWinsChart
              sortedWins={sortedWins}
              loadingStatsAPI={loadingStatsAPI}
            />
          </div>
        ) : (
          <div className="col-span-2 row-span-2 bg-neutral-600 rounded-2xl p-5 min-h-[260px]">
            <h2 className="text-lg text-center mb-4 font-semibold leading-tight h-12 flex items-center justify-center">
              Wins on Races per Constructors
            </h2>
            {/* removed placeholder text here */} {/* # */}
            <ConstructorWinsChart
              constructorWins={constructorWins}
              loading={constructorsLoading}
            />{" "}
            {/* # */}
          </div>
        )}
        {/* Right 2 small stats (same layout, different labels) */}
        {isDrivers && (
          <div className="col-span-2 flex space-x-6">
            {/* Card 1 */}
            <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
              <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
                {isDrivers ? (
                  <DriverStats
                    sortedWins={sortedWins}
                    loadingStatsAPI={loadingStatsAPI}
                    driverDetails={driverDetails}
                    loadingDetails={loadingDetails}
                    cardID="card1"
                    selectedDrivers={selectedDrivers}
                    setSelectedDrivers={setSelectedDrivers}
                  />
                ) : null}
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
              <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
                {isDrivers ? (
                  <DriverStats
                    sortedWins={sortedWins}
                    loadingStatsAPI={loadingStatsAPI}
                    driverDetails={driverDetails}
                    loadingDetails={loadingDetails}
                    cardID="card2"
                    selectedDrivers={selectedDrivers}
                    setSelectedDrivers={setSelectedDrivers}
                  />
                ) : null}
              </div>
            </div>
          </div>
        )}
        {/* Extra constructor stats cards when in constructors view */}
        {isDrivers ? null : ( // #
          <div className="col-span-2 flex space-x-6">
            {/* # */}
            <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
              {/* # */}
              <ConstructorStats
                constructorWins={constructorWins}
                loading={constructorsLoading}
                cardID="card1"
                selectedConstructors={selectedConstructors}
                setSelectedConstructors={setSelectedConstructors}
              />
              {/* # */}
            </div>
            {/* # */}
            <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
              {/* # */}
              <ConstructorStats
                constructorWins={constructorWins}
                loading={constructorsLoading}
                cardID="card2"
                selectedConstructors={selectedConstructors}
                setSelectedConstructors={setSelectedConstructors}
              />
              {/* # */}
            </div>
            {/* # */}
          </div> // #
        )}{" "}
        {/* # */}
        {/* Bottom Chart (same size; only metric label changes) */}
        <div className="col-start-3 col-span-2 bg-neutral-600 rounded-2xl p-6 min-h-[200px]">
          <div className="flex justify-around mb-4">
            <h3 className="text-base">
              <span className="font-semibold">Track: </span>Monza
            </h3>
            <h3 className="text-base">
              <span className="font-semibold">Metric: </span>
              {bottomMetricLabel}
            </h3>
          </div>

          {/* Chart here */}
        </div>
      </div>

      {/* Car illustration on the right */}
      <div className="w-40 flex justify-center">
        <img src={f1car} alt="f1 car" className="h-[300px]" />
      </div>
    </div>
  );
}
