/* eslint-disable react-hooks/exhaustive-deps */
import countiesGeo from "./json/countries.geo.json";
import GeoChart from "./components/GeoChart";
import { generateCountry } from "./helper/countries";
import { useEffect, useState } from "react";
import { TCountryCount, TCountry, TGeoJSON } from "./types";

const countiesGeoTyped = countiesGeo as TGeoJSON;

export default function App() {
  const [countryList, setCountryList] = useState<TCountryCount[] | []>([]);
  const [totalCounties, setTotalCountries] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<null | string>(null);

  const handleNewCountry = (newCountry: TCountry) => {
    setCountryList((prevCountryList) => {
      const countryExists = prevCountryList.find(
        (country) => country.country === newCountry.country
      );

      if (!countryExists) {
        return [...prevCountryList, { ...newCountry, count: 1 }];
      } else {
        return prevCountryList.map((country) => {
          if (newCountry.country === country.country) {
            return { ...country, count: country.count + 1 };
          }
          return country;
        });
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const country = generateCountry();
      setSelectedCountry(country.abbreviation);
      handleNewCountry(country);
    }, 1000);
    setSelectedCountry(null);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTotalCountries(totalCounties + 1);
  }, [countryList]);

  return (
    <>
      <h1>Map Testing</h1>
      <h2>Total: {totalCounties}</h2>
      <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
      <h3>{selectedCountry}</h3>
      <ul>
        {countryList.map((country, i) => (
          <li key={i}>
            {country.country} - Count: {country.count}
          </li>
        ))}
      </ul>
    </>
  );
}
