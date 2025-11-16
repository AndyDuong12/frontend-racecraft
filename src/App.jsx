import NavBar from "./components/navbar.jsx";
import MainContent from "./components/mainContent.jsx";

import "./styles.css";

export default function App() {
  /* const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.openf1.org/v1/car_data?driver_number=55&session_key=9159&speed>=315"
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();*/

  return (
    <div className="min-h-screen text-neutral-50 bg-neutral-800 p-6">
      <NavBar />
      <MainContent />
    </div>
  );
}
