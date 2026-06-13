function ProductTable({
  products,
  onEdit,
  onDelete
}) {

  return (

    <table>

      <thead>

        <tr>

          <th>Name</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {products.map(product => (

          <tr key={product.id}>

            <td>{product.name}</td>

            <td>{product.sku}</td>

            <td>${product.price}</td>

            <td>{product.quantity}</td>

            <td>

              <button
                className="edit-btn"
                onClick={() =>
                  onEdit(product)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  onDelete(product.id)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default ProductTable;