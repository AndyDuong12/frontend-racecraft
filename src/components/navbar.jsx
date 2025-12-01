import f1Icon from "../assets/F1_Logo.png"; // Formula 1 Icon
import driverIcon from "../assets/driverIcon.png";
import constructorIcon from "../assets/constructorIcon.png";

export default function NavBar({
  activeView,
  onChangeView,
  driverVsLabel,
  constructorVsLabel,
}) {
  return (
    <nav className="mb-8 rounded-3xl bg-neutral-950/80 border border-white/10 px-6 py-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-md">
      <div className="flex justify-between items-center">
        {/* Icon & Titles */}
        <div className="flex items-center space-x-6">
          {/* Logo stretched horizontally */}
          <div className="w-40">
            <img
              src={f1Icon}
              alt="F1 Icon"
              className="h-12 w-full object-contain"
            />
          </div>

          {/* Title + dynamic vs label */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold font-play">
              {activeView === "drivers"
                ? "Driver Comparison"
                : "Constructors Comparison"}
            </h1>
            <p className="mt-1 text-sm font-semibold tracking-wide text-[#E10600] uppercase">
              {activeView === "drivers" ? driverVsLabel : constructorVsLabel}
            </p>
          </div>
        </div>

        {/*Players & Teams */}
        <div className="flex space-x-4">
          {/* Drivers view toggle */}
          <button
            type="button"
            onClick={() => onChangeView("drivers")}
            className={`rounded-full transition ${
              activeView === "drivers"
                ? "ring-4 ring-red-500"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={driverIcon}
              alt="Driver Icon to switch to driver view"
              className="size-15 rounded-full object-cover"
            />
          </button>

          {/* Constructors view toggle */}
          <button
            type="button"
            onClick={() => onChangeView("constructors")}
            className={`rounded-full transition ${
              activeView === "constructors"
                ? "ring-4 ring-red-500"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={constructorIcon}
              alt="Constructor Icon to switch to constructor view"
              className="size-15 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
