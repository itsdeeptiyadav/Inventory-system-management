import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/StatCard";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await api.get("/dashboard");
      console.log("API RESPONSE:", response.data);
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!dashboard) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <h1>Dashboard</h1>

      {/* Statistics Cards */}

      <div className="dashboard-grid">

        <StatCard
          title="Products"
          value={dashboard.total_products}
        />

        <StatCard
          title="Customers"
          value={dashboard.total_customers}
        />

        <StatCard
          title="Orders"
          value={dashboard.total_orders}
        />

      </div>

      {/* Low Stock Products */}

      <h2>
        Low Stock Products (
        {dashboard.low_stock_products.length}
        )
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.low_stock_products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Dashboard;