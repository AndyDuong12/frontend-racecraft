import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DriverStats({ sortedWins, loading }) {
  const [selectedDriver, setSelectedDriver] = useState("Choose a driver");

  return (
    <div>
      {/* https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns */}
      <Menu as="div" className="relative inline-block mb-4">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-neutral-50 inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          {loading ? "Loading" : selectedDriver}
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
                  onClick={() => setSelectedDriver(d.name)}
                >
                  {d.name}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
      <p>Stats Placeholder</p>
    </div>
  );
}
