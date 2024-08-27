/* eslint-disable react-hooks/exhaustive-deps */
import "./Home.css";
import countiesGeo from "../../json/countries.geo.json";
import GeoChart from "../../components/GeoChart/GeoChart";
import { generateCountry } from "../../helper/countries";
import { useEffect, useState } from "react";
import { TCountryCount, TCountry, TGeoJSON } from "../../types";
import Card from "../../components/Card/Card";
import { getTime } from "../../helper/utils";
import AddCountry from "../../components/Animation/AddCountry";
import SwapCountry from "../../components/Animation/SwapCountry";
import { OCCURANCE } from "../../helper/constants";

const countiesGeoTyped = countiesGeo as TGeoJSON;
const currentTime = getTime();

export default function Home() {
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
    }, OCCURANCE);
    setSelectedCountry(null);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTotalCountries(totalCounties + 1);
  }, [countryList, setCountryList]);

  return (
    <>
      <div className="container" id="scroller">
        <h1>Births Occuring Around the World</h1>

        <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
        <div className="countries-stat">
          <p>{selectedCountry}</p>
          <p>
            Total Births since {currentTime}: {totalCounties}
          </p>
        </div>

        <ol className="countries-list">
          {countryList.map((country, i) => (
            <SwapCountry key={country.abbreviation_2}>
              <AddCountry>
                <Card>
                  <img
                    className="country-flat"
                    src={`/flags/${country.abbreviation_2.toLowerCase()}.png`}
                    alt={country.country}
                  />
                  {i + 1}. {country.country} - Count: {country.count}
                </Card>
              </AddCountry>
            </SwapCountry>
          ))}
        </ol>
        <div id="anchor"></div>
      </div>
    </>
  );
}
