import { useState } from "react";
import ProductCard from "../components/productCard";

export default function Home() {
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000000]);

    return <div style={{
      width: "1000px",
      display: "flex",
      margin: "auto",
      gap: "14px",
      marginTop: "50px",
    }}>
      <div className='custom-wrapper' style={{
        width: "200px",
        backgroundColor: "white",
        borderRadius: "14px",
        height: "14vh",
        position: "fixed",
        boxShadow: "0px 0px 7px 0px rgba(0, 0, 0, 0.3)"
      }}>
        <input 
          type="text" 
          value={search}
          style={{
            backgroundColor: "#A0A09F59",
            height: "35px",
            width: "calc(100% - 20px)",
            margin: "10px",
            borderRadius: "4px",
            fontSize: "12px",
            textAlign: "center",
            color: "#A0A09F",
          }}
          placeholder="¿Qué estás cultivando hoy?"
          onChange={(e) => {
            setSearch(e.target.value);
          }} />

          <h2 style={{
            fontSize: "20px",
            color: "#000000",
            marginLeft: "10px",
          }}>
            Price
          </h2>
          <h4  style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "hsl(0, 0%, 50%)",
            marginLeft: "10px",
            marginBottom: "10px",
          }}>
            {priceRange[0].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} - {priceRange[1].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
          </h4>

          <div className="slider">
              <div className="price-slider" style={{
                left: `${(priceRange[0] / 1000000) * 100}%`,
                right: `${(1 - (priceRange[1] / 1000000)) * 100}%`,
              }}></div>
          </div>

          <div className="range-input">
            <input type="range" className="min-range" min="0" max={1000000} value={priceRange[0]} step='1' onChange={ (e) => {
              setPriceRange([Math.min(parseInt(e.target.value), priceRange[1]), priceRange[1]]);
            }} />
            <input type="range" className="max-range" min="0" max={1000000} value={priceRange[1]} step='1' onChange={ (e) => {
              setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0])]);
            }} />
          </div>
          
      </div>
      <div style={{
        width: "100%",
        borderRadius: "14px",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "14px",
        paddingLeft: "214px",
        paddingBottom: "100px",
      }}>
        {
          Array.from({ length: 200 }, (_, i) => (
            <ProductCard id={i} />
          ))
        }
      </div>
    </div>;
  }

  
