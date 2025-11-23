import f1Icon from "../assets/formula1-icon.png"; // Formula 1 Icon
import ex1 from "../assets/example1.jpg";
import ex2 from "../assets/example2.jpg";

export default function NavBar() {
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
            Driver Comparison
          </h1>
          <p className="text-xl text-neutral-50">Hamilton vs Vettel</p>
        </div>
      </div>

      {/*Players & Teams */}
      <div className="flex space-x-4">
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
      </div>
    </div>
  );
}
