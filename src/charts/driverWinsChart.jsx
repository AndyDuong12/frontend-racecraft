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

export default function DriverWinsChart({ sortedWins, loadingStatsAPI }) {
  if (loadingStatsAPI || !sortedWins || sortedWins.length === 0) {
    return (
      <div className="flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  const data = {
    labels: sortedWins.map((d) => d.name),
    datasets: [
      {
        label: "Wins",
        data: sortedWins.map((d) => d.wins),
        backgroundColor: [
          "#3671C6", // Max Verstappen
          "#F58020", // Lando Norris
          "#F58020", // Oscar Piastri
          "#6CD3BF", // George Russell
          "#3671C6", // Sergio Perez
          "#F91536", // Charles Leclerc
          "#6CD3BF", // Lewis Hamilton
          "#F91536", // Carlos Sainz
        ],
        borderColor: [
          "#3671C6",
          "#F58020",
          "#F58020",
          "#6CD3BF",
          "#3671C6",
          "#F91536",
          "#6CD3BF",
          "#F91536",
        ],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 30,
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
