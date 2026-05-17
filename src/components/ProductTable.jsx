export function ProductTable({
  products,
  loading,
  activeProductId,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p>Loading inventory...</p>;
  }

  if (products.length === 0) {
    return <p className="empty-state">No products added yet.</p>;
  }

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={activeProductId === product.id ? "row-active" : ""}
            >
              <td>{product.name}</td>
              <td>{product.origin}</td>
              <td>{product.location}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.inventory}</td>
              <td className="table-actions">
                <button
                  className="inline-button"
                  type="button"
                  onClick={() => onEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className="inline-button inline-button-danger"
                  type="button"
                  onClick={() => onDelete(product.id)}
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
