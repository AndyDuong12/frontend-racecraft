import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DriverStats({
  sortedWins,
  loadingStatsAPI,
  driverDetails,
  loadingDetails,
  cardID,
  selectedDrivers,
  setSelectedDrivers,
}) {
  const selectedDriver = selectedDrivers[cardID];

  // Handle driver selection
  const handleSelectDriver = (driver) => {
    setSelectedDrivers((prev) => ({
      ...prev,
      [cardID]: driver,
    }));
  };

  // Filter out drivers already selected in other cards
  const availableDrivers = sortedWins.filter((driver) => {
    // Keep the current selection for this card
    if (
      selectedDriver &&
      driver.driver_number == selectedDriver.driver_number
    ) {
      return true;
    }

    // Filter out drivers selected in other cards
    return !Object.entries(selectedDrivers).some(
      ([id, selected]) =>
        id !== cardID && selected?.driver_number == driver.driver_number
    );
  });

  // Find the selected driver's details
  const selectedDriverDetails = selectedDriver
    ? driverDetails.find(
        (d) => d?.driver_number == selectedDriver.driver_number
      )
    : null;

  return (
    <div className="flex flex-col items-center">
      {/* Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns */}
      <Menu as="div" className="relative inline-block mb-3 w-full">
        <MenuButton
          disabled={loadingStatsAPI}
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-full bg-neutral-800/80 px-4 py-2.5 text-sm font-semibold text-neutral-50 shadow-sm ring-1 ring-inset ring-white/20 transition-colors duration-150 ${
            loadingStatsAPI
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-[#E10600] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:bg-[#E10600]"
          }`}
        >
          {selectedDriver
            ? selectedDriver.name
            : loadingStatsAPI
            ? "Loading"
            : "Choose a driver"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-neutral-300"
          />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-neutral-900/95 shadow-lg ring-1 ring-[#E10600]/40 border border-[#E10600]/40 focus:outline-none">
          <div className="py-1">
            {availableDrivers.map((d) => (
              <MenuItem key={d.driver_number}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => handleSelectDriver(d)}
                    className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                      focus
                        ? "bg-[#E10600] text-white"
                        : "text-neutral-50 hover:bg-[#E10600] hover:text-white"
                    }`}
                  >
                    {d.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      {/* Driver Stats */}
      {selectedDriver && !loadingStatsAPI && (
        <div className="mt-3 flex flex-col items-center gap-4 w-full">
          {loadingDetails ? (
            <div className="text-sm">Loading driver details</div>
          ) : selectedDriverDetails ? (
            <>
              {/* Headshot */}
              {selectedDriverDetails.headshot_url ? (
                <img
                  src={selectedDriverDetails.headshot_url}
                  alt={selectedDriver.name}
                  className="size-20 object-cover rounded-full border-2"
                />
              ) : (
                <div className="size-20 rounded-full flex items-center justify-center border-2">
                  <span className="text-xs">No photo</span>
                </div>
              )}

              {/* Stats Grid */}
              <div className="w-full space-y-2">
                {[
                  {
                    label: "Driver No.",
                    value: selectedDriverDetails.driver_number,
                  },
                  {
                    label: "Name Acronym",
                    value: selectedDriverDetails.name_acronym,
                  },
                  {
                    label: "Wins",
                    value: selectedDriver.wins,
                  },
                  {
                    label: "Country Code",
                    value: selectedDriverDetails.country_code,
                  },
                  {
                    label: "Team Name",
                    value: selectedDriverDetails.team_name,
                  },
                  {
                    label: "Team Color",
                    value: selectedDriverDetails.team_colour,
                    isColor: true,
                  },
                ].map((stat, index) =>
                  stat.value ? (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs"
                    >
                      {/* Label */}
                      <span className="font-bold">{stat.label}:</span>
                      {/* Value */}
                      {stat.isColor ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="size-6 rounded-full border"
                            style={{ backgroundColor: `#${stat.value}` }}
                          />
                        </div>
                      ) : (
                        <span>{stat.value}</span>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </>
          ) : (
            <div className="text-sm">No driver details available</div>
          )}
        </div>
      )}
    </div>
  );
}
