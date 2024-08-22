/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import countiesGeo from "./json/countries.geo.json";
import GeoChart from "./components/GeoChart/GeoChart";
import { generateCountry } from "./helper/countries";
import { useEffect, useState } from "react";
import { TCountryCount, TCountry, TGeoJSON } from "./types";
import Card from "./components/Card/Card";

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
  }, [countryList, setCountryList]);

  return (
    <main className="container">
      <div className="main-section">
        <h1>Birth Simulator</h1>
        <h2>Total: {totalCounties}</h2>
        <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
        <h3>{selectedCountry}</h3>
        <ol>
          {countryList.map((country, i) => (
            <Card key={i}>
              <li>
                {country.country} - Count: {country.count}
              </li>
            </Card>
          ))}
        </ol>
      </div>
    </main>
  );
}
