import { TCumulativeDistribution } from "../types";
import { TCountryJSON } from "../types";

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
  console.log(cumulativeDistribution);
  return cumulativeDistribution;
};

export const generateCountry = (
  cumulativeDistribution: TCumulativeDistribution[]
) => {
  const total =
    cumulativeDistribution[cumulativeDistribution.length - 1].cumulativeValue;
  const randomValue = Math.random() * total;

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

  return cumulativeDistribution[low].country;
};
