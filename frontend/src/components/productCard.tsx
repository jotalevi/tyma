import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function ProductCard({ id }: { id: number }) {
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link to='/product/id'>
        <div className="productCard">
        <div className="wrapImages">
            <div
            id={`f1${id}`}
            className={`imageBox ${flipped ? "smallImage" : "fullImage"}`}
            style={{ backgroundColor: "red", color: "white" }}
            >
            F1
            </div>
            <div
            id={`f2${id}`}
            className={`imageBox ${flipped ? "fullImage" : "smallImage"}`}
            style={{ backgroundColor: "yellow", color: "white" }}
            >
            F2
            </div>
        </div>
        aaa - {id}
        </div>
    </Link>
  );
}
