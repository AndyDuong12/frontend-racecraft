import { useMemo } from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Function to generate a random color
const generateColors = (labels) => {
  const colors = {};
  labels.forEach((label) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors[label] = `rgba(${r}, ${g}, ${b})`;
  });

  return colors;
};

export default function DriverCountryChart({
  sortedWins,
  driverDetails,
  loading,
}) {
  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  // Check if the data is available
  if (
    !sortedWins ||
    sortedWins.length === 0 ||
    !driverDetails ||
    driverDetails.length === 0
  ) {
    return (
      <div className="flex items-center justify-center h-40">
        No data available
      </div>
    );
  }

  // Group wins by country
  const countryWins = {};

  sortedWins.forEach((driver) => {
    const details = driverDetails.find(
      (d) => String(d?.driver_number) === String(driver.driver_number)
    );

    if (details && details.country_code) {
      const country = details.country_code;
      countryWins[country] = (countryWins[country] || 0) + driver.wins;
    }
  });

  // Sorted by wins and prepare data and charts
  const sortedCountries = Object.entries(countryWins).sort(
    (a, b) => b[1] - a[1]
  );

  const labels = sortedCountries.map(([country]) => country);
  const values = sortedCountries.map(([_, wins]) => wins);
  const colorMap = useMemo(() => generateColors(labels), [labels.join(",")]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((c) => colorMap[c]),
        borderColor: "#ffffff",
        borderWidth: 1.5,
        hoverOffset: 10,
        radius: "80%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 1 },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
          font: { size: 12 },
          padding: 10,
          boxWidth: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} wins (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          size: 9,
          weight: "bold",
        },
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0].data;
          const total = dataset.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        anchor: "end",
        align: "end",
        offset: 6,
      },
    },
  };

  return (
    <div className="w-full h-5/6 flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}
