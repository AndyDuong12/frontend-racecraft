import f1car from "../assets/formula1-car-icon.png"; // Car image on the right

import DriverWinsAPI from "../api/drivers/driverWinsAPI.jsx";
import DriverWinsChart from "../charts/driverWinsChart.jsx";
import DriverStats from "../charts/driverStats.jsx";

export default function MainContent({ activeView }) {
  const { sortedWins, loading } = DriverWinsAPI();

  const isDrivers = activeView === "drivers";

  // Text that changes between views, layout stays identical
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
            <DriverWinsChart sortedWins={sortedWins} loading={loading} />
          </div>
        ) : (
          <div className="col-span-2 row-span-2 bg-neutral-600 rounded-2xl p-5 min-h-[260px]">
            <h2 className="text-lg text-center mb-4 font-semibold leading-tight h-12 flex items-center justify-center">
              Wins on Races per Constructors
            </h2>
            <p>Chart Placeholder</p>
          </div>
        )}

        {/* Right 2 small stats (same layout, different labels) */}
        <div className="col-span-2 flex space-x-6">
          {/* Card 1 */}
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
            <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
              {isDrivers ? (
                <DriverStats sortedWins={sortedWins} loading={loading} />
              ) : (
                "Mercedes"
              )}
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
            <div className="text-sm text-center font-medium leading-tight flex items-center justify-center">
              {isDrivers ? (
                <DriverStats sortedWins={sortedWins} loading={loading} />
              ) : (
                "Red Bull"
              )}
            </div>
          </div>
        </div>

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
          <p>Chart Placeholder</p>
        </div>
      </div>

      {/* Car illustration on the right */}
      <div className="w-40 flex justify-center">
        <img src={f1car} alt="f1 car" className="h-[300px]" />
      </div>
    </div>
  );
}
