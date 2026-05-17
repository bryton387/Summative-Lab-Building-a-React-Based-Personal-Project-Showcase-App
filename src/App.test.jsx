import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const mockProducts = [
  {
    id: "ethiopian-roast",
    name: "Ethiopian Sunrise",
    description: "Bright citrus notes with a tea-like finish.",
    origin: "Yirgacheffe",
    location: "Location 1",
    price: 18.5,
    inventory: 24,
  },
  {
    id: "kenyan-reserve",
    name: "Kenyan Reserve",
    description: "Jammy berry sweetness with a bold aroma.",
    origin: "Nyeri",
    location: "Location 2",
    price: 20,
    inventory: 16,
  },
];

function mockFetchImplementation() {
  global.fetch = vi.fn((url, options = {}) => {
    const method = options.method || "GET";

    if (method === "GET") {
      return Promise.resolve({
        ok: true,
        json: async () => mockProducts.map((product) => ({ ...product })),
      });
    }

    if (method === "POST") {
      const createdProduct = JSON.parse(options.body);
      mockProducts.push(createdProduct);
      return Promise.resolve({
        ok: true,
        json: async () => ({ ...createdProduct }),
      });
    }

    if (method === "PATCH") {
      const updatedFields = JSON.parse(options.body);
      const id = String(url).split("/").at(-1);
      const product = mockProducts.find((entry) => entry.id === id);
      Object.assign(product, updatedFields);
      return Promise.resolve({
        ok: true,
        json: async () => ({ ...product }),
      });
    }

    if (method === "DELETE") {
      const id = String(url).split("/").at(-1);
      const index = mockProducts.findIndex((entry) => entry.id === id);
      if (index >= 0) {
        mockProducts.splice(index, 1);
      }
      return Promise.resolve({
        ok: true,
        status: 204,
      });
    }

    return Promise.reject(new Error("Unhandled request"));
  });
}

beforeEach(() => {
  mockProducts.splice(
    0,
    mockProducts.length,
    {
      id: "ethiopian-roast",
      name: "Ethiopian Sunrise",
      description: "Bright citrus notes with a tea-like finish.",
      origin: "Yirgacheffe",
      location: "Location 1",
      price: 18.5,
      inventory: 24,
    },
    {
      id: "kenyan-reserve",
      name: "Kenyan Reserve",
      description: "Jammy berry sweetness with a bold aroma.",
      origin: "Nyeri",
      location: "Location 2",
      price: 20,
      inventory: 16,
    },
  );
  mockFetchImplementation();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("renders the landing page content", () => {
  render(
    <MemoryRouter
      initialEntries={["/"]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: /coffee r us/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /browse products/i })).toBeInTheDocument();
});

test("filters products from the search field", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter
      initialEntries={["/shop"]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </MemoryRouter>,
  );

  await screen.findByText(/ethiopian sunrise/i);
  await user.type(screen.getByLabelText(/search products/i), "Kenyan");

  expect(screen.queryByText(/ethiopian sunrise/i)).not.toBeInTheDocument();
  expect(screen.getByText(/kenyan reserve/i)).toBeInTheDocument();
});

test("creates, edits, and deletes a product from the admin page", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter
      initialEntries={["/admin"]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </MemoryRouter>,
  );

  await screen.findByText(/ethiopian sunrise/i);

  await user.type(screen.getByLabelText(/coffee name/i), "Tanzanian Peak");
  await user.type(
    screen.getByLabelText(/description/i),
    "Floral aroma with cocoa in the finish.",
  );
  await user.type(screen.getByLabelText(/origin/i), "Arusha");
  await user.selectOptions(screen.getByLabelText(/location/i), "Location 3");
  await user.type(screen.getByLabelText(/^price$/i), "21.5");
  await user.type(screen.getByLabelText(/inventory/i), "9");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  await screen.findByText(/added tanzanian peak/i);
  expect(screen.getByRole("cell", { name: /tanzanian peak/i })).toBeInTheDocument();

  const editButtons = screen.getAllByRole("button", { name: /edit/i });
  await user.click(editButtons.at(-1));
  const priceInput = screen.getByLabelText(/^price$/i);
  await user.clear(priceInput);
  await user.type(priceInput, "22.25");
  await user.click(screen.getByRole("button", { name: /save changes/i }));

  await screen.findByText(/updated tanzanian peak/i);
  expect(screen.getByText("$22.25")).toBeInTheDocument();

  const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  await user.click(deleteButtons.at(-1));

  await waitFor(() => {
    expect(screen.queryByRole("cell", { name: /tanzanian peak/i })).not.toBeInTheDocument();
  });
});
