import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h2 className="sidebar-logo">
        Inventory
      </h2>

      <nav>

        <NavLink
          to="/"
          className="sidebar-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className="sidebar-link"
        >
          Products
        </NavLink>

        <NavLink
          to="/customers"
          className="sidebar-link"
        >
          Customers
        </NavLink>

        <NavLink
          to="/orders"
          className="sidebar-link"
        >
          Orders
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;