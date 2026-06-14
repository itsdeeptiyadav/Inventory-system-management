import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      phone: ""
    });

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {

    try {

      const response =
        await api.get("/customers/");

      setCustomers(response.data);

    } catch {

      toast.error(
        "Failed to fetch customers"
      );

    } finally {

      setLoading(false);

    }
  }

  async function addCustomer(e) {

    e.preventDefault();

    try {

      await api.post(
        "/customers/",
        formData
      );

      toast.success(
        "Customer added"
      );

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

      fetchCustomers();

    } catch (error) {

      toast.error(
        error.response?.data?.detail
      );
    }
  }

  async function deleteCustomer(id) {

    if (
      !window.confirm(
        "Delete customer?"
      )
    ) {
      return;
    }

    try {

      await api.delete(
        `/customers/${id}`
      );

      toast.success(
        "Customer deleted"
      );

      fetchCustomers();

    } catch {

      toast.error(
        "Delete failed"
      );

    }
  }

  if (loading)
    return <Loader />;

  return (

    <div>

      <h1>
        Customer Management
      </h1>

      <form
        onSubmit={addCustomer}
        className="product-form"
      >

        <input
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              full_name: e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value
            })
          }
        />

        <button>
          Add Customer
        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {customers.map(customer => (

            <tr key={customer.id}>

              <td>
                {customer.full_name}
              </td>

              <td>
                {customer.email}
              </td>

              <td>
                {customer.phone}
              </td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCustomer(
                      customer.id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;