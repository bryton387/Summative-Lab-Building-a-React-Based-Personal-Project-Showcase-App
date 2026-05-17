export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <dl>
        <div>
          <dt>Origin</dt>
          <dd>{product.origin}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{product.location}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>${product.price.toFixed(2)}</dd>
        </div>
      </dl>
    </article>
  );
}
