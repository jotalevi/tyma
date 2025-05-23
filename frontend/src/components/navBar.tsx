import { Link } from "react-router-dom";
import "../index.css"

export default function NavBar() {
    return (
    <nav style={{
        width: "100%",
        height: "100px",
        backgroundColor: "#6B705C",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "100px",
        paddingRight: "100px",
    }}>
        <div id="leftnav">
            <Link to="/" id="hover-link-color" style={{
                fontSize: "64px",
            }}>tyma</Link>
        </div>
        <div id="rightnav" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
        }}>
            <Link to="/account" id="hover-link-color" style={{
                fontSize: "24px",
            }}>
                Account
            </Link>
            <Link to="/cart" id="hover-link-color" style={{
                fontSize: "24px",
            }}>
                Cart
            </Link>
        </div>
    </nav>);
  }
  