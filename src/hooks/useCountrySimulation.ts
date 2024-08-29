import { useState } from "react";
import { TCountry, TCountryCount, TCountryJSON } from "../types";
import {
  generateCountry,
  precomputeCumulativeDistrubution,
  generatePeople,
} from "../helper/countries";
// import { OCCURANCE } from "../helper/constants";
import { useLocation } from "react-router-dom";
import useInterval from "./useInterval";

type PropTypes = {
  countryData: TCountryJSON;
};
const useCountrySimulation = ({ countryData }: PropTypes) => {
  const [countryList, setCountryList] = useState<TCountryCount[] | []>([]);
  const [totalPeople, setTotalPeople] = useState<number>(0);
  const [recentlyAddedCountries, setRecentlyAddedCountries] = useState<
    null | TCountry[]
  >(null);
  const { pathname } = useLocation();

  const handleNewCountry = (newCountries: TCountry[]) => {
    setCountryList((prevCountryList) => {
      const updatedCountryList = [...prevCountryList];
      newCountries.forEach((newCountry) => {
        const existingCountryIndex = updatedCountryList.findIndex(
          (country) => country.country === newCountry.country
        );
        if (existingCountryIndex !== -1) {
          updatedCountryList[existingCountryIndex].count += 1;
        } else {
          updatedCountryList.push({ ...newCountry, count: 1 });
        }
      });

      return updatedCountryList.sort((a, b) => b.count - a.count);
    });
  };

  useInterval(() => {
    const distribution = precomputeCumulativeDistrubution(countryData);
    const numberOfPeople = generatePeople(pathname);
    const countries = generateCountry(distribution, numberOfPeople);
    setTotalPeople(totalPeople + numberOfPeople);
    setRecentlyAddedCountries(countries);
    handleNewCountry(countries);
  }, 2000);

  return {
    countryList,
    totalPeople,
    selectedCountry: recentlyAddedCountries,
  };
};

export default useCountrySimulation;
