import f1Icon from "../assets/formula1-icon.png"; // Formula 1 Icon
import ex1 from "../assets/example1.jpg";
import ex2 from "../assets/example2.jpg";

<<<<<<< Updated upstream
export default function NavBar({ activeView, onChangeView }) {
=======
export default function NavBar() {
>>>>>>> Stashed changes
  return (
    <div className="flex justify-between items-center">
      {/* Icon & Titles */}
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <img src={f1Icon} alt="F1 Icon" className="size-20" />
        {/* Vertical Line */}
        <div className="w-px h-20 bg-neutral-50" />
        {/* Titles */}
        <div className="flex flex-col">
          <h1 className="text-4xl text-neutral-50 font-bold">
<<<<<<< Updated upstream
            {activeView === "drivers"
              ? "Driver Comparison"
              : "Constructors Comparison"}
          </h1>
          <p className="text-xl text-neutral-50">
            {activeView === "drivers"
              ? "Hamilton vs Vettel"
              : "Mercedes vs Red Bull"}
          </p>
=======
            Driver Comparison
          </h1>
          <p className="text-xl text-neutral-50">Hamilton vs Vettel</p>
>>>>>>> Stashed changes
        </div>
      </div>

      {/*Players & Teams */}
      <div className="flex space-x-4">
<<<<<<< Updated upstream
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
            src={ex1}
            alt="example1"
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
            src={ex2}
            alt="example2"
            className="size-15 rounded-full object-cover"
          />
        </button>
=======
        <img
          src={ex1}
          alt="example1"
          className="size-15 rounded-full object-cover"
        />
        <img
          src={ex2}
          alt="example2"
          className="size-15 rounded-full object-cover"
        />
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
