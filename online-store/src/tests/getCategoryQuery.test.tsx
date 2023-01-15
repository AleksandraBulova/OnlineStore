import { getCaterogyQuery } from "../utils/getFiltersQuery";

test("Get category query string", () => {
  expect(
    getCaterogyQuery({
      Wine: false,
      Whiskey: false,
      Cognac: false,
      Vodka: false,
    })
  ).toBeFalsy();
  expect(
    getCaterogyQuery({
      Wine: false,
      Whiskey: true,
      Cognac: true,
      Vodka: false,
    })
  ).toBe("&categories=Whiskey,Cognac");
  expect(
    getCaterogyQuery({
      Wine: false,
      Whiskey: true,
      Cognac: true,
      Vodka: false,
    })
  ).not.toMatch(/Wine|Vodka/);
});
