/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TCountry, TCountryCount, TCountryJSON } from "../types";
import {
  generateCountry,
  precomputeCumulativeDistrubution,
} from "../helper/countries";
import { OCCURANCE } from "../helper/constants";

type PropTypes = {
  countryData: TCountryJSON;
};
const useCountrySimulation = ({ countryData }: PropTypes) => {
  const [countryList, setCountryList] = useState<TCountryCount[] | []>([]);
  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<null | string>(null);

  const handleNewCountry = (newCountry: TCountry) => {
    setCountryList((prevCountryList) => {
      let countryFound = false;
      const updatedCountryList = prevCountryList.map((country) => {
        if (country.country === newCountry.country) {
          countryFound = true;
          return { ...country, count: country.count + 1 };
        }
        return country;
      });

      if (!countryFound) {
        updatedCountryList.push({ ...newCountry, count: 1 });
      }

      return updatedCountryList.sort((a, b) => b.count - a.count);
    });
  };

  useEffect(() => {
    const distribution = precomputeCumulativeDistrubution(countryData);

    const interval = setInterval(() => {
      const country = generateCountry(distribution);
      setSelectedCountry(country.abbreviation_3);
      handleNewCountry(country);
    }, OCCURANCE);
    setSelectedCountry(null);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTotalCountries(totalCountries + 1);
  }, [countryList]);

  return {
    countryList,
    totalCountries,
    selectedCountry,
  };
};

export default useCountrySimulation;
