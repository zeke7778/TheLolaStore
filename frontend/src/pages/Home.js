import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const load = async (params = {}) => {
    setLoading(true);
    try {
      const data = await getProducts(params);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await load({ keyword: q, category });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content container">
          <h1 className="hero-title">The Lola Store</h1>
          <p className="hero-tagline">
            Minimal. Elegant. Affordable.
            <span>Shine with every look.</span>
          </p>

          {/* Search Card */}
          <form onSubmit={handleSearch} className="search-card">
            <div className="input-group">
              <input
                className="search-input"
                placeholder="Search e.g. hoop, stud..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                className="search-input"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="search-actions">
              <button className="btn-primary" type="submit">
                Search
              </button>

              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  setQ("");
                  setCategory("");
                  load();
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Product Section */}
      <section className="products-section container">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <Loader />
        ) : (
          <ProductList products={products} onAdd={addToCart} />
        )}
      </section>
    </div>
  );
};

export default Home;
