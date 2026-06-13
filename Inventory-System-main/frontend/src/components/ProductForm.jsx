import { useState } from "react";

function ProductForm({
  onSubmit,
  initialData = null,
  buttonText = "Add Product"
}) {

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      sku: "",
      price: "",
      quantity: ""
    }
  );

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.sku ||
      !formData.price
    ) {
      alert("All fields required");
      return;
    }

    onSubmit(formData);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="product-form"
    >

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />

      <button type="submit">
        {buttonText}
      </button>

    </form>
  );
}

export default ProductForm;