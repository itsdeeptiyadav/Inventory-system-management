import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      customer_id: "",
      product_id: "",
      quantity: 1
    });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const [
        ordersRes,
        productsRes,
        customersRes
      ] = await Promise.all([
        api.get("/orders"),
        api.get("/products"),
        api.get("/customers")
      ]);

      setOrders(
        ordersRes.data
      );

      setProducts(
        productsRes.data
      );

      setCustomers(
        customersRes.data
      );

    } catch {

      toast.error(
        "Failed loading data"
      );

    } finally {

      setLoading(false);

    }
  }

  async function createOrder(e) {

    e.preventDefault();

    try {

      await api.post(
        "/orders",
        {
          customer_id:
            Number(
              formData.customer_id
            ),
          product_id:
            Number(
              formData.product_id
            ),
          quantity:
            Number(
              formData.quantity
            )
        }
      );

      toast.success(
        "Order created"
      );

      loadData();

    } catch (error) {

      toast.error(
        error.response?.data?.detail
      );

    }
  }

  if (loading)
    return <Loader />;

  return (

    <div>

      <h1>
        Order Management
      </h1>

      <form
        className="product-form"
        onSubmit={createOrder}
      >

        <select
          onChange={(e) =>
            setFormData({
              ...formData,
              customer_id:
                e.target.value
            })
          }
        >

          <option>
            Select Customer
          </option>

          {customers.map(c => (

            <option
              key={c.id}
              value={c.id}
            >
              {c.full_name}
            </option>

          ))}

        </select>

        <select
          onChange={(e) =>
            setFormData({
              ...formData,
              product_id:
                e.target.value
            })
          }
        >

          <option>
            Select Product
          </option>

          {products.map(p => (

            <option
              key={p.id}
              value={p.id}
            >
              {p.name}
            </option>

          ))}

        </select>

        <input
          type="number"
          min="1"
          value={
            formData.quantity
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity:
                e.target.value
            })
          }
        />

        <button>
          Create Order
        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr key={order.id}>

              <td>
                {order.id}
              </td>

              <td>
                {order.customer_id}
              </td>

              <td>
                {order.product_id}
              </td>

              <td>
                {order.quantity}
              </td>

              <td>
                ₹
                {order.total_amount}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Orders;