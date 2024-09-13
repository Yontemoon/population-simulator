import "./Footer.css";
import { TITLE } from "../../helper/constants";

const Footer = () => {
  return (
    <footer className="flex-wrapper">
      <div className="container footer-wrapper">
        <div>{TITLE} 2024</div>
        <div>
          Statistics based on{" "}
          <a href="https://population.un.org/wpp/Download/Standard/MostUsed/">
            United Nations
          </a>
        </div>
        <div>
          Created By <a href="https://monteyoon.com">Monte Yoon</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
