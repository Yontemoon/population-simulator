import clsx from "clsx";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { TITLE } from "../../helper/constants";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex-wrapper">
      <div className="header-container container">
        <h1>
          <Link to="/">{TITLE}</Link>
        </h1>
        <nav className="nav-container">
          <ul className="nav-menu">
            <li className={clsx("nav-entry", pathname === "/" && "nav-active")}>
              <Link to="/">Births</Link>
            </li>
            <li
              className={clsx(
                "nav-entry",
                pathname === "/deaths" && "nav-active"
              )}
            >
              <Link to="/deaths">Deaths</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
