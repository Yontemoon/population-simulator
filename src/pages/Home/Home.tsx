import "./Home.css";
import countiesGeo from "../../json/countries.geo.json";
import GeoChart from "../../components/GeoChart/GeoChart";
import { TGeoJSON } from "../../types";
import { getTime } from "../../helper/utils";

import birthsPerCountry from "../../json/births-per-countries.json";
import CountryList from "../../components/CountryList/CountryList";
import useCountrySimulation from "../../hooks/useCountrySimulation";

const countiesGeoTyped = countiesGeo as TGeoJSON;
const currentTime = getTime();

export default function Home() {
  const { countryList, selectedCountry, totalCountries } = useCountrySimulation(
    {
      countryData: birthsPerCountry,
    }
  );

  return (
    <>
      <div className="container" id="scroller">
        <h1>Births Occuring Around the World</h1>

        <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
        <div className="countries-stat">
          <p>{selectedCountry}</p>
          <p>
            Total Births since {currentTime}: {totalCountries}
          </p>
        </div>
        <CountryList countryList={countryList} />

        <div id="anchor" />
      </div>
    </>
  );
}
