import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductCard } from "../components/ProductCard";

export function ShopPage() {
  const { products, loading, error } = useProducts();
  const {
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
    locations,
    filteredProducts,
  } = useProductFilters(products);

  return (
    <section className="shop-layout">
      <aside className="shop-sidebar">
        <label className="search-label" htmlFor="product-search">
          Search products
        </label>
        <input
          id="product-search"
          className="search-input"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <fieldset className="location-filter">
          <legend>Locations</legend>
          {locations.map((location) => (
            <label key={location} className="location-option">
              <input
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={(event) => setSelectedLocation(event.target.value)}
              />
              <span>{location}</span>
            </label>
          ))}
        </fieldset>
      </aside>

      <div className="shop-content">
        <div className="section-heading">
          <h2>Shop</h2>
          <p>{filteredProducts.length} products available</p>
        </div>

        {loading ? <p>Loading products...</p> : null}
        {error ? <p role="alert">{error}</p> : null}

        {!loading && !error ? (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="empty-state">No products match your search yet.</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
