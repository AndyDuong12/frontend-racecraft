import { useEffect, useState } from "react";

export default function useDriverStatsAPI(sortedWins) {
  const BASEURL = "https://api.openf1.org/v1"; // API url

  const [driverDetails, setDriverDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);

  // Fetch from API using data from sortedWins
  useEffect(() => {
    if (!sortedWins || sortedWins.length === 0) return;

    async function fetchDriverDetails() {
      try {
        const res = await Promise.all(
          sortedWins.map((d) =>
            fetch(`${BASEURL}/drivers?driver_number=${d.driver_number}`)
          )
        );

        const data = await Promise.all(res.map((r) => r.json()));

        // Each response is an array; pick the most recent entry
        const cleaned = data.map((d) => d[0] || null);
        setDriverDetails(cleaned);
      } catch (err) {
        console.error(`Error fetching driver details: ${err}`);
      } finally {
        setLoadingDetails(false);
      }
    }

    fetchDriverDetails();
  }, [sortedWins]);

  useEffect(() => {
    if (!loadingDetails && driverDetails.length > 0) {
      console.log('Driver details fetched:', driverDetails);
      // See the object in table form:
      console.table(driverDetails);
    }
  }, [loadingDetails]);

  return { driverDetails, loadingDetails}
}
