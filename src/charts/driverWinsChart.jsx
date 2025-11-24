import DriverWinsAPI from "../api/drivers/driverWinsAPI.jsx";

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function DriverWinsChart() {
  const { sortedWins, loading } = DriverWinsAPI();

  // Loading
  if (loading)
    return <div className="text-center text-3xl font-bold">Loading...</div>;

  // chart.js data formatting
  const data = {
    labels: sortedWins.map((d) => d.name),
    datasets: [
      {
        label: "Wins",
        data: sortedWins.map((d) => d.wins),
        backgroundColor: "rgba(255, 178, 102, 0.7)",
        borderColor: "rgba(255, 178, 102, 0.7)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: "white" },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "white",
        font: { weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto h-5/6">
      <Bar data={data} options={options} />
    </div>
  );
}
