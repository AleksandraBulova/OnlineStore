import { getPropsToFilter } from "../utils/getPropsToFilter";

test("Get properties for filter settings", () => {
  expect(
    getPropsToFilter({
      Wine: false,
      Whiskey: false,
      Cognac: false,
      Vodka: false,
    })
  ).toEqual([]);
  expect(
    getPropsToFilter({
      Wine: true,
      Whiskey: false,
      Cognac: false,
      Vodka: true,
    })
  ).toEqual(["Wine", "Vodka"]);
});
