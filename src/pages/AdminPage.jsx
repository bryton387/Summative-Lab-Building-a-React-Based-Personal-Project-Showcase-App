import { useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { ProductTable } from "../components/ProductTable";
import { useProducts } from "../hooks/useProducts";

const initialFormState = {
  name: "",
  description: "",
  origin: "",
  location: "Location 1",
  price: "",
  inventory: "",
};

export function AdminPage() {
  const { products, loading, error, addProduct, editProduct, removeProduct } =
    useProducts();
  const [message, setMessage] = useState("");
  const [activeProductId, setActiveProductId] = useState("");

  const activeProduct =
    products.find((product) => product.id === activeProductId) || null;

  async function handleSubmit(formValues) {
    const payload = {
      ...formValues,
      price: Number(formValues.price),
      inventory: Number(formValues.inventory),
    };

    if (activeProduct) {
      await editProduct(activeProduct.id, payload);
      setMessage(`Updated ${payload.name}.`);
    } else {
      const id = payload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      await addProduct({ ...payload, id });
      setMessage(`Added ${payload.name}.`);
    }

    setActiveProductId("");
  }

  async function handleDelete(id) {
    const product = products.find((entry) => entry.id === id);
    await removeProduct(id);
    setMessage(`Deleted ${product?.name || "product"}.`);

    if (activeProductId === id) {
      setActiveProductId("");
    }
  }

  return (
    <section className="admin-layout">
      <div className="admin-form-panel">
        <div className="section-heading">
          <h2>Admin Portal</h2>
          <p>Create, update, and remove coffee listings.</p>
        </div>

        {message ? <p className="status-banner">{message}</p> : null}
        {error ? <p role="alert">{error}</p> : null}

        <ProductForm
          key={activeProduct?.id || "new-product"}
          initialValues={activeProduct || initialFormState}
          submitLabel={activeProduct ? "Save Changes" : "Submit"}
          onCancel={() => setActiveProductId("")}
          onSubmit={handleSubmit}
          isEditing={Boolean(activeProduct)}
        />
      </div>

      <div className="admin-table-panel">
        <div className="section-heading">
          <h2>Current Products</h2>
          <p>{loading ? "Loading inventory..." : `${products.length} total items`}</p>
        </div>

        <ProductTable
          products={products}
          loading={loading}
          activeProductId={activeProductId}
          onEdit={setActiveProductId}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
