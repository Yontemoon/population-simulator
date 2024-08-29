import "./CountryList.css";
import { TCountryCount } from "../../types";
import AddCountry from "../Animation/AddCountry";
import SwapCountry from "../Animation/SwapCountry";
import Card from "../Card/Card";
type PropTypes = {
  countryList: [] | TCountryCount[];
};

const CountryList = ({ countryList }: PropTypes) => {
  return (
    <ol className="countries-list">
      {countryList.map((country, i) => (
        <SwapCountry key={country.abbreviation_2}>
          <AddCountry>
            <Card className="country-content">
              <div>{i + 1}.</div>
              <div className="country-info">
                <span className="country-line">{country.country} </span>- Count:{" "}
                {country.count}
              </div>
              <img
                className="country-flag"
                src={`/flags/${country.abbreviation_2.toLowerCase()}.png`}
                alt={country.country}
              />
            </Card>
          </AddCountry>
        </SwapCountry>
      ))}
    </ol>
  );
};

export default CountryList;
