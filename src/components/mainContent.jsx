import { useMemo } from "react"; // useState removed

import useDriverWinsAPI from "../api/drivers/driverWinsAPI.jsx"; // API call for 'Wins on Races per Driver'
import useDriverStatsAPI from "../api/drivers/driverStatsAPI.jsx"; // API call for drivers stats
import DriverWinsChart from "../charts/driverWinsChart.jsx"; // Chart for 'Wins on Races per Driver'
import DriverStats from "../charts/driverStats.jsx"; // Driver stats
import DriverCountryChart from "../charts/driverCountryChart.jsx"; // Driver Country Chart
import ConstructorWinsChart from "../charts/constructorWinsChart.jsx";
import ConstructorStats from "../charts/constructorStats.jsx";

export default function MainContent({
  activeView,
  selectedDrivers,
  setSelectedDrivers,
  selectedConstructors,
  setSelectedConstructors,
}) {
  // Fetch from API
  const { sortedWins, loadingStatsAPI } = useDriverWinsAPI();
  const { driverDetails, loadingDetails } = useDriverStatsAPI(sortedWins);

  // Group driver wins by team to get constructor wins
  const constructorWins = useMemo(() => {
    if (!sortedWins || sortedWins.length === 0 || !driverDetails) {
      return [];
    }
      return [];
    }

    const teamMap = new Map();
    const teamMap = new Map();

    sortedWins.forEach((driverWin) => {
      const details = driverDetails.find(
        (d) => String(d?.driver_number) === String(driverWin.driver_number)
      );
        (d) => String(d?.driver_number) === String(driverWin.driver_number) // updated
      );

      if (!details || !details.team_name) return;
      if (!details || !details.team_name) return;

      const teamName = details.team_name;
      const teamColour = details.team_colour;
      const teamName = details.team_name;
      const teamColour = details.team_colour;

      const existing = teamMap.get(teamName);
      const existing = teamMap.get(teamName);
      if (existing) {
        existing.wins += driverWin.wins;
        existing.wins += driverWin.wins;
      } else {
        teamMap.set(teamName, {
          teamName,
          teamColour,
          wins: driverWin.wins,
        });
      }
    });
          teamName,
          teamColour,
          wins: driverWin.wins,
        });
      }
    });

    return Array.from(teamMap.values()).sort((a, b) => b.wins - a.wins);
  }, [sortedWins, driverDetails]);
    return Array.from(teamMap.values()).sort((a, b) => b.wins - a.wins);
  }, [sortedWins, driverDetails]);

  const constructorsLoading = loadingStatsAPI || loadingDetails;

  // Text that changes between views, layout stays identical
  const isDrivers = activeView === "drivers";
  const bottomMetricLabel = isDrivers
    ? "Lap Time Comparison"
    : "Race Wins per Season";

  // Shared card styling for F1-style panels
  const cardBase =
    "bg-neutral-900/80 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md";

  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-4 gap-6 w-full px-20">
        {/* Left Chart (same size for both views) */}
        {isDrivers ? (
          <div
            className={`${cardBase} col-span-2 row-span-2 p-5 min-h-[260px]`}
          >
            <h2 className="mb-4 leading-tight h-12 flex flex-col items-center justify-center">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E10600] uppercase mb-1">
                Drivers • Wins
              </span>
              <span className="text-lg font-semibold font-play">
                Wins on Races per Driver
              </span>
            </h2>
            <DriverWinsChart
              sortedWins={sortedWins}
              loadingStatsAPI={loadingStatsAPI}
            />
          </div>
        ) : (
          <div
            className={`${cardBase} col-span-2 row-span-2 p-5 min-h-[260px]`}
          >
            <h2 className="mb-4 leading-tight h-12 flex flex-col items-center justify-center">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E10600] uppercase mb-1">
                Constructors • Wins
              </span>
              <span className="text-lg font-semibold font-play">
                Wins on Races per Constructors
              </span>
            </h2>
            {/* removed placeholder text here */}
            <ConstructorWinsChart
              constructorWins={constructorWins}
              loading={constructorsLoading}
            />
            />
          </div>
        )}

        {/* Right 2 small stats (same layout, different labels) */}
        {isDrivers && (
          <div className="col-span-2 flex space-x-6 z-1">
            {/* Card 1 */}
            <div className={`${cardBase} flex-1 p-6 min-h-[150px]`}>
              <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
                <DriverStats
                  sortedWins={sortedWins}
                  loadingStatsAPI={loadingStatsAPI}
                  driverDetails={driverDetails}
                  loadingDetails={loadingDetails}
                  cardID="card1"
                  selectedDrivers={selectedDrivers}
                  setSelectedDrivers={setSelectedDrivers}
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className={`${cardBase} flex-1 p-6 min-h-[150px]`}>
              <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
                <DriverStats
                  sortedWins={sortedWins}
                  loadingStatsAPI={loadingStatsAPI}
                  driverDetails={driverDetails}
                  loadingDetails={loadingDetails}
                  cardID="card2"
                  selectedDrivers={selectedDrivers}
                  setSelectedDrivers={setSelectedDrivers}
                />
              </div>
            </div>
          </div>
        )}

        {/* Extra constructor stats cards when in constructors view */}
        {isDrivers ? null : (
          <div className="col-span-2 flex space-x-6 z-1">
            <div className={`${cardBase} flex-1 p-6 min-h-[150px]`}>
              <ConstructorStats
                constructorWins={constructorWins}
                loading={constructorsLoading}
                cardID="card1"
                selectedConstructors={selectedConstructors}
                setSelectedConstructors={setSelectedConstructors}
              />
            </div>

            <div className={`${cardBase} flex-1 p-6 min-h-[150px]`}>
              <ConstructorStats
                constructorWins={constructorWins}
                loading={constructorsLoading}
                cardID="card2"
                selectedConstructors={selectedConstructors}
                setSelectedConstructors={setSelectedConstructors}
              />
            </div>
          </div>
        )}

        {/* Bottom Chart (same size; only metric label changes) */}
        <div
          className={`${cardBase} col-start-3 col-span-2 pt-6 min-h-[360px]`}
        >
          {isDrivers ? (
            <>
              <h3 className="flex justify-center items-center mb-4 ">
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
                  <span className="text-[#E10600] mr-1">Drivers</span>• Country
                  Distribution
                </span>
              </h3>
              <DriverCountryChart
                sortedWins={sortedWins}
                driverDetails={driverDetails}
                loading={loadingStatsAPI || loadingDetails}
              />
            </>
          ) : null}
        </div>
      </div>
      {/* car PNG removed so content stays centered */}
    </div>
  );
}
