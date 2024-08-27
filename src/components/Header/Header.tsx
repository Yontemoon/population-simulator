import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex-wrapper">
      <div className="header-container container">
        <Link to="/">Population Simulator</Link>
        <nav className="nav-container">
          <ul className="nav-menu">
            <li className="nav-entry">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-entry">
              <Link to="/deaths">Deaths</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
