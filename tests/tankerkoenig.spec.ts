import * as tankerkoenig from "../index";
const APIKEY = process.env.TANKERKOENIG_APIKEY || "";

test("stats return stats", async () => {
  const { E5, E10, Diesel } = await tankerkoenig.stats({ apikey: APIKEY });
  expect(E5).toBeDefined();
  expect(E10).toBeDefined();
  expect(Diesel).toBeDefined();
});

test("byCoordinates returns stations", async () => {
  const { stations } = await tankerkoenig.byCoordinates({
    lat: 50.114634,
    lng: 8.687657,
    apikey: APIKEY,
  });
  expect(stations).toBeDefined();
});

test("byIds returns stations", async () => {
  const { stations } = await tankerkoenig.byIds({
    ids: ["83d5ac80-4f23-4106-b054-7c7704bfcb95"],
    apikey: APIKEY,
  });
  expect(stations).toBeDefined();
});

test("byPostalCode returns a valid response", async () => {
  const { stations } = await tankerkoenig.byPostalcode({
    postalcode: "11011",
    apikey: APIKEY,
  });
  console.log(stations);
  expect(stations).toBeDefined();
});

// no test for complaint, as I don't want to report wrong data by running unittests
// TODO: Mock the actual http call, to avoid reporting wrong data
