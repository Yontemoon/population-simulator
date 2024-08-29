import "./DeathSimulator.css";
import countiesGeo from "../../json/countries.geo.json";
import GeoChart from "../../components/GeoChart/GeoChart";
import { getTime } from "../../helper/utils";
import deathsPerCountry from "../../json/deaths-per-countries.json";
import CountryList from "../../components/CountryList/CountryList";
import useCountrySimulation from "../../hooks/useCountrySimulation";
import { TGeoJSON } from "../../types";

const countiesGeoTyped = countiesGeo as TGeoJSON;
const currentTime = getTime();

export default function DeathSimulator() {
  const { countryList, selectedCountry, totalPeople } = useCountrySimulation({
    countryData: deathsPerCountry,
  });

  return (
    <>
      <div className="container" id="scroller">
        <h1>Deaths Occuring Around the World</h1>

        <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
        <div className="countries-stat">
          {selectedCountry?.map((country, i) => (
            <p key={i}>{country.country}</p>
          ))}
          <p>
            Total Deaths since {currentTime}: {totalPeople}
          </p>
        </div>
        <CountryList countryList={countryList} />
        <div id="anchor"></div>
      </div>
    </>
  );
}
