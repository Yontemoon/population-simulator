import "./Card.css";
import clsx from "clsx";

type PropTypes = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: PropTypes) => {
  return <div className={clsx("card-container", className)}>{children}</div>;
};

export default Card;
