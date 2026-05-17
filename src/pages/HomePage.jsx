import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Specialty coffee inventory made simple</p>
        <h1>Coffee R Us</h1>
        <p className="hero-subtitle">The go to store for your coffee needs</p>
        <p className="hero-description">
          Manage featured beans, update pricing, and keep every store location in
          sync from one responsive admin portal.
        </p>
        <div className="hero-actions">
          <Link className="hero-button" to="/shop">
            Browse Products
          </Link>
          <Link className="hero-button hero-button-secondary" to="/admin">
            Open Admin Portal
          </Link>
        </div>
      </div>
    </section>
  );
}
