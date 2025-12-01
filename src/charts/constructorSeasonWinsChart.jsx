// src/charts/constructorSeasonWinsChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TARGET_CONSTRUCTORS } from "../api/constructors/constructorSeasonWinsAPI.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// F1 team colours
const TEAM_COLOURS = {
  "Red Bull Racing": "#3671C6",
  McLaren: "#F58020",
  Mercedes: "#6CD3BF",
  Ferrari: "#F91536",
};

export default function ConstructorSeasonWinsChart({
  seasonWins,
  seasons,
  loading,
}) {
  if (loading || !seasonWins) {
    return (
      <div className="text-sm text-neutral-400">
        Loading race wins per season…
      </div>
    );
  }

  const labels = seasons.map(String);

  const datasets = TARGET_CONSTRUCTORS.map((teamName) => ({
    label: teamName,
    data: seasons.map((year) => seasonWins[year]?.[teamName] || 0),
    backgroundColor: TEAM_COLOURS[teamName] || "#888888",
    borderRadius: 999,
    maxBarThickness: 18,
  }));

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white", boxWidth: 12 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} wins`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.8)" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "rgba(255,255,255,0.8)" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-72">
      <Bar data={data} options={options} />
    </div>
  );
}
