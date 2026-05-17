import { useMemo, useState } from "react";

export function useProductFilters(products) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All locations");

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(products.map((product) => product.location))];
    return ["All locations", ...uniqueLocations];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.description, product.origin]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesLocation =
        selectedLocation === "All locations" ||
        product.location === selectedLocation;

      return matchesSearch && matchesLocation;
    });
  }, [products, searchTerm, selectedLocation]);

  return {
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
    locations,
    filteredProducts,
  };
}
