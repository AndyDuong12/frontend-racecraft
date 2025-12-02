import { TARGET_CONSTRUCTORS } from "../api/constructors/constructorSeasonWinsAPI.jsx";

// F1 team colours
const TEAM_COLOURS = {
  "Red Bull Racing": "#3671C6",
  McLaren: "#F58020",
  Mercedes: "#6CD3BF",
  Ferrari: "#F91536",
};

const DEFAULT_COLOUR = "#888888";

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== "string") {
    return `rgba(136, 136, 136, ${alpha})`;
  }

  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return `rgba(136, 136, 136, ${alpha})`;
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

  const seasonLabels = Array.isArray(seasons) ? seasons : [];

  // Find the max wins value across all teams & seasons to scale colour intensity
  const maxWins =
    seasonLabels.reduce((max, year) => {
      const yearMax = TARGET_CONSTRUCTORS.reduce((innerMax, teamName) => {
        const wins = seasonWins[year]?.[teamName] ?? 0;
        return wins > innerMax ? wins : innerMax;
      }, 0);

      return yearMax > max ? yearMax : max;
    }, 0) || 1;

  const getCellStyle = (teamName, wins) => {
    if (!wins || wins <= 0) {
      return {
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: "0.375rem",
      };
    }

    const baseHex = TEAM_COLOURS[teamName] || DEFAULT_COLOUR;

    // Scale intensity between 0.3 and 1.0 based on wins
    const intensity = 0.3 + (0.7 * wins) / maxWins;

    return {
      backgroundColor: hexToRgba(baseHex, intensity),
      borderRadius: "0.375rem",
    };
  };

  return (
    <div className="w-full h-64 md:h-72 text-xs text-neutral-100 flex items-center justify-center">
      <table className="border-separate border-spacing-2">
        <thead>
          <tr>
            <th
              className="px-3 py-2 text-left font-semibold text-[0.7rem] uppercase tracking-wide text-neutral-300 whitespace-nowrap"
              style={{ minWidth: "140px" }}
            >
              Constructor
            </th>
            {seasonLabels.map((year) => (
              <th
                key={year}
                className="px-1 py-2 text-center font-semibold text-[0.7rem] uppercase tracking-wide text-neutral-300 whitespace-nowrap"
              >
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TARGET_CONSTRUCTORS.map((teamName) => {
            const baseColour = TEAM_COLOURS[teamName] || DEFAULT_COLOUR;

            return (
              <tr key={teamName}>
                <td
                  className="px-3 py-2 text-[0.75rem] whitespace-nowrap"
                  style={{ minWidth: "140px" }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full mr-2 align-middle"
                    style={{ backgroundColor: baseColour }}
                  />
                  <span className="align-middle">{teamName}</span>
                </td>

                {seasonLabels.map((year) => {
                  const wins = seasonWins[year]?.[teamName] ?? 0;
                  const style = getCellStyle(teamName, wins);

                  return (
                    <td
                      key={`${teamName}-${year}`}
                      className="px-1 py-2 text-center text-[0.7rem]"
                      style={style}
                      aria-label={`${teamName} wins in ${year}: ${wins}`}
                    >
                      {wins > 0 ? wins : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
