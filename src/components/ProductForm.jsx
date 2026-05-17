import { useState } from "react";

const defaultValues = {
  name: "",
  description: "",
  origin: "",
  location: "Location 1",
  price: "",
  inventory: "",
};

export function ProductForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel,
  onCancel,
  isEditing,
}) {
  const [formValues, setFormValues] = useState({
    ...defaultValues,
    ...initialValues,
    price: initialValues.price ?? "",
    inventory: initialValues.inventory ?? "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Coffee name is required.";
    }

    if (!formValues.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!formValues.origin.trim()) {
      nextErrors.origin = "Origin is required.";
    }

    if (Number(formValues.price) <= 0) {
      nextErrors.price = "Price must be greater than zero.";
    }

    if (Number(formValues.inventory) < 0) {
      nextErrors.inventory = "Inventory cannot be negative.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(formValues);

    if (!isEditing) {
      setFormValues(defaultValues);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Coffee Name
        <input
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </label>

      <label>
        Description
        <textarea
          name="description"
          rows="3"
          value={formValues.description}
          onChange={handleChange}
        />
        {errors.description ? (
          <span className="field-error">{errors.description}</span>
        ) : null}
      </label>

      <label>
        Origin
        <input
          name="origin"
          type="text"
          value={formValues.origin}
          onChange={handleChange}
        />
        {errors.origin ? (
          <span className="field-error">{errors.origin}</span>
        ) : null}
      </label>

      <label>
        Location
        <select name="location" value={formValues.location} onChange={handleChange}>
          <option>Location 1</option>
          <option>Location 2</option>
          <option>Location 3</option>
          <option>Location 4</option>
        </select>
      </label>

      <label>
        Price
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formValues.price}
          onChange={handleChange}
        />
        {errors.price ? <span className="field-error">{errors.price}</span> : null}
      </label>

      <label>
        Inventory
        <input
          name="inventory"
          type="number"
          min="0"
          step="1"
          value={formValues.inventory}
          onChange={handleChange}
        />
        {errors.inventory ? (
          <span className="field-error">{errors.inventory}</span>
        ) : null}
      </label>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {submitLabel}
        </button>
        {isEditing ? (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
