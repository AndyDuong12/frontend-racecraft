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

// Team → color mapping
const TEAM_COLORS = {
  "Red Bull Racing": "#3671C6",
  McLaren: "#F58020",
  Mercedes: "#6CD3BF",
  Ferrari: "#F91536",
};

const DEFAULT_BAR_COLOR = "#D8924C";

export default function ConstructorWinsChart({ constructorWins, loading }) {
  if (loading) {
    return <p className="text-sm text-center">Loading constructor wins...</p>;
  }

  if (!constructorWins || constructorWins.length === 0) {
    return <p className="text-sm text-center">No constructor data available</p>;
  }

  const labels = constructorWins.map((team) => team.teamName);
  const wins = constructorWins.map((team) => team.wins);

  const backgroundColors = constructorWins.map(
    (team) => TEAM_COLORS[team.teamName] || DEFAULT_BAR_COLOR
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Wins",
        data: wins,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#ffffff",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value) => (value > 0 ? value : ""),
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          padding: 6,
        },
        grid: {
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
