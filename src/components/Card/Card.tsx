import "./Card.css";
import clsx from "clsx";

type PropTypes = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const Card = ({ children, className, id }: PropTypes) => {
  return (
    <div className={clsx("card-container", className)} id={id}>
      {children}
    </div>
  );
};

export default Card;
