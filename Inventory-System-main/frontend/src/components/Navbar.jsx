import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <h2>
        Inventory System
      </h2>

      <div>

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/customers">
          Customers
        </Link>

        <Link to="/orders">
          Orders
        </Link>

      </div>

    </nav>

  );
}

export default Navbar;