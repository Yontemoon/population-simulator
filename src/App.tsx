/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import countiesGeo from "./json/countries.geo.json";
import GeoChart from "./components/GeoChart/GeoChart";
import { generateCountry } from "./helper/countries";
import { useEffect, useState } from "react";
import { TCountryCount, TCountry, TGeoJSON } from "./types";
import Card from "./components/Card/Card";
import { getTime } from "./helper/utils";
import Footer from "./components/Footer/Footer";

const countiesGeoTyped = countiesGeo as TGeoJSON;
const currentTime = getTime();
export default function App() {
  const [countryList, setCountryList] = useState<TCountryCount[] | []>([]);
  const [totalCounties, setTotalCountries] = useState<number>(0);
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
    const interval = setInterval(() => {
      const country = generateCountry();
      setSelectedCountry(country.abbreviation_3);
      handleNewCountry(country);
    }, 250);
    setSelectedCountry(null);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTotalCountries(totalCounties + 1);
  }, [countryList, setCountryList]);

  return (
    <main>
      <div className="container">
        <h1>Birth Simulator</h1>

        <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
        <div className="countries-stat">
          <p>{selectedCountry}</p>
          <p>
            Total Births since {currentTime}: {totalCounties}
          </p>
        </div>

        <ol className="countries-list">
          {countryList.map((country, i) => (
            <Card key={i}>
              <li>
                <img
                  className="country-flat"
                  src={`/flags/${country.abbreviation_2.toLowerCase()}.png`}
                  alt={country.country}
                />
                {country.country} - Count: {country.count}
              </li>
            </Card>
          ))}
        </ol>
        <Footer />
      </div>
    </main>
  );
}
