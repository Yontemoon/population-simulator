import countries from "../json/countries.json";
import { TOTAL_BIRTHS } from "./constants";
import { TCumulativeDistribution } from "../types";

const cumulativeDistribution = [] as TCumulativeDistribution[];

export const precomputeCumulativeDistrubution = () => {
  let sum = 0;
  for (let i = 0; i < countries.country.length; i++) {
    sum = sum + countries.country[i].value;
    cumulativeDistribution.push({
      country: countries.country[i],
      cumulativeValue: sum,
    });
  }
  return cumulativeDistribution;
};

precomputeCumulativeDistrubution();

export const generateCountry = () => {
  const randomValue = Math.random() * TOTAL_BIRTHS;

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

  //   console.log(cumulativeDistribution[low].country);
  return cumulativeDistribution[low].country;
};
