import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DriverStats({
  sortedWins,
  loadingStatsAPI,
  driverDetails,
  loadingDetails,
}) {
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Loading check
  if (loadingStatsAPI || !sortedWins || sortedWins.length === 0) {
    return (
      <div className="text-center">
        <div className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-neutral-50">
          Loading...
        </div>
      </div>
    );
  }

  // Find the selected driver's details
  const selectedDriverDetails = selectedDriver
    ? driverDetails.find(
        (d) => d?.driver_number == selectedDriver.driver_number
      )
    : null;

  return (
    <div className="flex flex-col items-center">
      {/* Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns */}
      <Menu as="div" className="relative inline-block mb-3">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-neutral-50 inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          {selectedDriver ? selectedDriver.name : "Choose a driver"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-700  outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            {sortedWins.map((d) => (
              <MenuItem key={d.driver_number}>
                <button
                  className="w-full block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5  data-focus:text-white data-focus:outline-hidden"
                  onClick={() => setSelectedDriver(d)}
                >
                  {d.name}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      {/* Driver Stats */}
      {selectedDriver && (
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
