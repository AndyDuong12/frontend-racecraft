# How to run this project

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Run the project with `npm run dev`.
4. The project is also deployed at: https://frontend-racecraft.vercel.app/

## Folders structure

```
frontend-racecraft/
├── src/
│   ├── api/
│   │   ├── constructors/
│   │   │   └── constructorSeasonWinsAPI.jsx    [Fetch API and return constructor wins]
│   │   └── drivers/
|   |       ├── driverStatsAPI.jsx  [Fetch API and return driver's stats]
│   │       └── driverWinsAPI.jsx   [Fetch API and return drivers and wins]
│   ├── assets/
│   ├── charts/
|   |   ├── constructorSeasonWinsChart.jsx
|   |   ├── constructorStats.jsx
|   |   ├── constructorWinsChart.jsx    
|   |   ├── driverCountryChart.jsx  [Create country pie chart for drivers]
|   |   ├── driverStats.jsx         [Create stats for drivers]
│   │   └── driverWinsChart.jsx     [Create chart for Wins on Races per Driver]
│   ├── components/
│   │   ├── mainContent.jsx         [The main panels on the body of the page]
│   │   └── navbar.jsx              [The navbar]
│   └── App.jsx
└── README.md
```
