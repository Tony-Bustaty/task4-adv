import { Link } from "react-router";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <ul className="links">
        <li className="link active">
          <Link to="/items">
            <img src="/assets/products.png" alt="products icon" />
            <p>Products</p>
          </Link>
        </li>
        <li className="link">
          <Link to="/items">
            <img src="/assets/bookmark.png" alt="bookmark icon" />
            <p>Favorites</p>
          </Link>
        </li>
        <li className="link">
          <Link to="/items">
            <img src="/assets/bookmark.png" alt="bookmark icon" />
            <p>order list</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
