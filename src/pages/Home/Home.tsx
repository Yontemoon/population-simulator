import "./Home.css";
import countiesGeo from "../../json/countries.geo.json";
import GeoChart from "../../components/GeoChart/GeoChart";
import { TGeoJSON } from "../../types";
import { getTime } from "../../helper/utils";
import birthsPerCountry from "../../json/births-per-countries.json";
import CountryList from "../../components/CountryList/CountryList";
import useCountrySimulation from "../../hooks/useCountrySimulation";
import Card from "../../components/Card/Card";
import SlidingAnimation from "../../components/Animation/SlidingAnimation";

const countiesGeoTyped = countiesGeo as TGeoJSON;
const currentTime = getTime();

export default function Home() {
  const {
    countryList,
    recentlyAddedCountries: selectedCountry,
    totalPeople,
  } = useCountrySimulation({
    countryData: birthsPerCountry,
  });

  return (
    <>
      <div className="container" id="scroller">
        <div className="home-header-container">
          <h1 className="home-header">Births Occuring Around the World</h1>
          <div className="countries-stat">
            <p>
              Total Births since {currentTime}: <span>{totalPeople}</span>
            </p>
          </div>
        </div>

        <div className="chart-section">
          <GeoChart data={countiesGeoTyped} selectedCountry={selectedCountry} />
          <Card className="current-countries">
            <SlidingAnimation>
              {selectedCountry?.length === 0 ? (
                <li>No Births</li>
              ) : (
                selectedCountry?.map((country, i) => (
                  <li key={i}>
                    {i + 1}. {country.country}
                  </li>
                ))
              )}
            </SlidingAnimation>
          </Card>
        </div>
        <CountryList countryList={countryList} />
        <div id="anchor" />
      </div>
    </>
  );
}
