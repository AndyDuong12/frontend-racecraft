<<<<<<< Updated upstream
// src/components/mainContent.jsx
import f1car from "../assets/formula1-car-icon.png";

export default function MainContent({ activeView }) {
  const isDrivers = activeView === "drivers";

  // Text that changes between views, layout stays identical
  const leftPanelTitle = isDrivers
    ? "Wins on Races per Driver"
    : "Wins on Races per Constructor";

  const leftCardTitle = isDrivers ? "HAMILTON Lewis" : "Mercedes";
  const rightCardTitle = isDrivers ? "VETTEL Sebastian" : "Red Bull";

  const bottomMetricLabel = isDrivers
    ? "Lap Time Comparison"
    : "Race Wins per Season";

  return (
    <div className="flex mt-10">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Chart (same size for both views) */}
        <div className="col-span-1 row-span-2 bg-neutral-600 rounded-2xl p-5 min-h-[260px]">
          <h2 className="text-lg text-center mb-4 font-semibold leading-tight h-12 flex items-center justify-center">
            {leftPanelTitle}
=======
import f1car from "../assets/formula1-car-icon.png";

export default function mainContent() {
  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Chart */}
        <div className="col-span-1 row-span-2 bg-neutral-600 rounded-2xl p-5">
          <h2 className="text-lg text-center mb-4 font-semibold">
            Wins on Races per Driver
>>>>>>> Stashed changes
          </h2>
          {/* Chart here */}
          <p>Chart Placeholder</p>
        </div>

<<<<<<< Updated upstream
        {/* Right 2 small stats (same layout, different labels) */}
        <div className="col-span-3 flex space-x-6">
          {/* Card 1 */}
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
            <h3 className="text-sm text-center font-medium mb-4 leading-tight h-6 flex items-center justify-center">
              {leftCardTitle}
=======
        {/* Right 2 small stats */}
        <div className="col-span-3 flex space-x-6">
          {/* Card 1 */}
          <div className="flex-1 bg-neutral-600  p-6 rounded-2xl">
            <h3 className="text-sm text-center font-medium mb-4">
              HAMILTON Lewis
>>>>>>> Stashed changes
            </h3>
            {/* Stats here */}
            <p>Stats Placeholder</p>
          </div>

          {/* Card 2 */}
<<<<<<< Updated upstream
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl min-h-[150px]">
            <h3 className="text-sm text-center font-medium mb-4 leading-tight h-6 flex items-center justify-center">
              {rightCardTitle}
=======
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl">
            <h3 className="text-sm text-center font-medium mb-4">
              VETTEL Sebastian
>>>>>>> Stashed changes
            </h3>
            {/* Stats here */}
            <p>Stats Placeholder</p>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Bottom Chart (same size; only metric label changes) */}
        <div className="col-start-2 col-span-3 bg-neutral-600 rounded-2xl p-6 min-h-[200px]">
=======
        {/* Bottom Chart */}
        <div className="col-start-2 col-span-3 bg-neutral-600 rounded-2xl p-6">
>>>>>>> Stashed changes
          <div className="flex justify-around mb-4">
            <h3 className="text-base">
              <span className="font-semibold">Track: </span>Monza
            </h3>
            <h3 className="text-base">
<<<<<<< Updated upstream
              <span className="font-semibold">Metric: </span>
              {bottomMetricLabel}
=======
              <span className="font-semibold">Metric: </span>Lap Time Comparison
>>>>>>> Stashed changes
            </h3>
          </div>

          {/* Chart here */}
          <p>Chart Placeholder</p>
        </div>
      </div>
<<<<<<< Updated upstream

      {/* Car illustration on the right */}
=======
>>>>>>> Stashed changes
      <div className="w-40 flex justify-center">
        <img src={f1car} alt="f1 car" className="h-[300px]" />
      </div>
    </div>
  );
}
