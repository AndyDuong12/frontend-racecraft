import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ConstructorStats({
  constructorWins,
  loading,
  cardID,
  selectedConstructors,
  setSelectedConstructors,
}) {
  const selectedConstructor = selectedConstructors[cardID];

  const handleSelectConstructor = (team) => {
    setSelectedConstructors((prev) => ({
      ...prev,
      [cardID]: team,
    }));
  };

  // Don’t allow the same constructor to be selected in both cards
  const availableConstructors = constructorWins.filter((team) => {
    if (selectedConstructor && team.teamName === selectedConstructor.teamName) {
      return true;
    }

    return !Object.entries(selectedConstructors).some(
      ([id, selected]) => id !== cardID && selected?.teamName === team.teamName
    );
  });

  return (
    <div className="flex flex-col items-center">
      {/* Simple dropdown for team selection */}
      <Menu as="div" className="relative inline-block mb-3 w-full">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-neutral-50 shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20">
          {selectedConstructor ? selectedConstructor.teamName : "Choose a team"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {availableConstructors.map((team) => (
              <MenuItem key={team.teamName}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => handleSelectConstructor(team)}
                    className={`w-full px-4 py-2 text-left text-sm ${
                      focus ? "bg-white/10 text-white" : "text-neutral-50"
                    }`}
                  >
                    {team.teamName}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      {/* Stats for the selected constructor */}
      {selectedConstructor && !loading && (
        <div className="mt-3 flex flex-col items-center gap-4 w-full">
          <div className="w-full space-y-2">
            {[
              { label: "Team Name", value: selectedConstructor.teamName },
              { label: "Total Wins", value: selectedConstructor.wins },
              {
                label: "Team Color",
                value: selectedConstructor.teamColour,
                isColor: true,
              },
            ].map((stat) =>
              stat.value ? (
                <div
                  key={stat.label}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="font-bold">{stat.label}:</span>
                  {stat.isColor ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="size-6 rounded-full border"
                        style={{
                          backgroundColor: `#${stat.value}`,
                        }}
                      />
                    </div>
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="text-sm mt-3">Loading constructor stats…</div>
      )}
    </div>
  );
}
