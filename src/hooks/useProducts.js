import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../services/productApi";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const nextProducts = await fetchProducts();
      setProducts(nextProducts);
    } catch (loadError) {
      setError(loadError.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = useCallback(async (product) => {
    const createdProduct = await createProduct(product);
    setProducts((currentProducts) => [...currentProducts, createdProduct]);
    return createdProduct;
  }, []);

  const editProduct = useCallback(async (id, updates) => {
    const savedProduct = await updateProduct(id, updates);
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, ...savedProduct } : product,
      ),
    );
    return savedProduct;
  }, []);

  const removeProduct = useCallback(async (id) => {
    await deleteProduct(id);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }, []);

  return {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}
