import { getBrandQuery } from "../utils/getFiltersQuery";

test("Get brands query string", () => {
  expect(
    getBrandQuery({
      Nikka: false,
      Donnafugata: false,
      "Santa Carolina": false,
      Kavalan: false,
    })
  ).toBeFalsy();
  expect(
    getBrandQuery({
      Nikka: false,
      Donnafugata: true,
      "Santa Carolina": true,
      Kavalan: false,
    })
  ).toBe("&brands=Donnafugata,Santa Carolina");
  expect(
    getBrandQuery({
      Nikka: true,
      Donnafugata: false,
      "Santa Carolina": true,
      Kavalan: false,
    })
  ).not.toMatch(/Donnafugata|Kavalan/);
});
