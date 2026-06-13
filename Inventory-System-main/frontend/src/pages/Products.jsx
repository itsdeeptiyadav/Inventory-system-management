import { useEffect } from "react";
import { useState } from "react";

import api from "../services/api";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Modal from "../components/Modal";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [showModal,
    setShowModal] =
    useState(false);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      const response =
        await api.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  async function addProduct(
    productData
  ) {

    try {

      await api.post(
        "/products",
        {
          ...productData,
          price:
            Number(productData.price),
          quantity:
            Number(productData.quantity)
        }
      );

      fetchProducts();

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed"
      );

    }
  }

  async function updateProduct(
    productData
  ) {

    try {

      await api.put(
        `/products/${editingProduct.id}`,
        {
          ...productData,
          price:
            Number(productData.price),
          quantity:
            Number(productData.quantity)
        }
      );

      setShowModal(false);

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  }

  async function deleteProduct(
    id
  ) {

    const confirmed =
      window.confirm(
        "Delete product?"
      );

    if (!confirmed) return;

    try {

      await api.delete(
        `/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  }

  return (

    <div>

      <h1>
        Product Management
      </h1>

      <ProductForm
        onSubmit={addProduct}
      />

      <ProductTable
        products={products}
        onEdit={(product) => {

          setEditingProduct(product);

          setShowModal(true);

        }}
        onDelete={deleteProduct}
      />

      <Modal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
      >

        <h2>
          Update Product
        </h2>

        <ProductForm
          initialData={
            editingProduct
          }
          onSubmit={
            updateProduct
          }
          buttonText="Update"
        />

      </Modal>

    </div>
  );
}

export default Products;