const API_URL = "http://localhost:3001/products";

async function request(url = API_URL, options) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchProducts() {
  return request();
}

export async function createProduct(product) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, updates) {
  return request(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export async function deleteProduct(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
