import f1car from "../assets/formula1-car-icon.png";

export default function mainContent() {
  return (
    <div className="flex mt-10">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Chart */}
        <div className="col-span-1 row-span-2 bg-neutral-600 rounded-2xl p-5">
          <h2 className="text-lg text-center mb-4 font-semibold">
            Wins on Races per Driver
          </h2>
          {/* Chart here */}
          <p>Chart Placeholder</p>
        </div>

        {/* Right 2 small stats */}
        <div className="col-span-3 flex space-x-6">
          {/* Card 1 */}
          <div className="flex-1 bg-neutral-600  p-6 rounded-2xl">
            <h3 className="text-sm text-center font-medium mb-4">
              HAMILTON Lewis
            </h3>
            {/* Stats here */}
            <p>Stats Placeholder</p>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-neutral-600 p-6 rounded-2xl">
            <h3 className="text-sm text-center font-medium mb-4">
              VETTEL Sebastian
            </h3>
            {/* Stats here */}
            <p>Stats Placeholder</p>
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="col-start-2 col-span-3 bg-neutral-600 rounded-2xl p-6">
          <div className="flex justify-around mb-4">
            <h3 className="text-base">
              <span className="font-semibold">Track: </span>Monza
            </h3>
            <h3 className="text-base">
              <span className="font-semibold">Metric: </span>Lap Time Comparison
            </h3>
          </div>

          {/* Chart here */}
          <p>Chart Placeholder</p>
        </div>
      </div>
      <div className="w-40 flex justify-center">
        <img src={f1car} alt="f1 car" className="h-[300px]" />
      </div>
    </div>
  );
}
