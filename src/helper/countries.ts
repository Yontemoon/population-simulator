import { TCountry, TCumulativeDistribution, TCountryJSON } from "../types";

export const precomputeCumulativeDistrubution = (countryJSON: TCountryJSON) => {
  const cumulativeDistribution = [] as TCumulativeDistribution[];
  let sum = 0;
  for (let i = 0; i < countryJSON.country.length; i++) {
    sum = sum + countryJSON.country[i].value;
    cumulativeDistribution.push({
      country: countryJSON.country[i],
      cumulativeValue: sum,
    });
  }
  return cumulativeDistribution;
};

export const generatePeople = (url: string) => {
  if (url === "/") {
    return Math.floor(Math.random() * 9);
  } else {
    return Math.floor(Math.random() * 5);
  }
};

export const generateCountry = (
  cumulativeDistribution: TCumulativeDistribution[],
  numberOfPeople: number
) => {
  const countriesSelected = [] as TCountry[];
  const total =
    cumulativeDistribution[cumulativeDistribution.length - 1].cumulativeValue;

  const randomValues = [];
  for (let i = 0; i < numberOfPeople; i++) {
    const randomValue = Math.random() * total;
    randomValues.push(randomValue);
  }

  randomValues.forEach((randomValue) => {
    let low = 0;
    let high = cumulativeDistribution.length - 1;
    while (high > low) {
      const mid = Math.floor((low + high) / 2);

      if (cumulativeDistribution[mid].cumulativeValue < randomValue) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    countriesSelected.push(cumulativeDistribution[low].country);
  });

  return countriesSelected;
};
