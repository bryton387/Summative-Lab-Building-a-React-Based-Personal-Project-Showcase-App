# Coffee R Us Admin Portal

A React single-page application for managing coffee products in an e-commerce admin experience. The app includes a landing page, a searchable shop page, and an admin portal for full product CRUD.

## Features

- Client-side routing with `react-router-dom`
- Standard hooks with `useState`, `useEffect`, and `useCallback`
- Custom hooks with `useProducts` and `useProductFilters`
- Simulated backend persistence using `json-server` and `db.json`
- Create, read, update, and delete product records
- Dynamic search and location filtering
- Responsive layout inspired by the supplied mockup
- Component tests with Vitest and React Testing Library

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the mock API in one terminal:

```bash
npm run server
```

3. Start the React app in a second terminal:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
npm test
```

Create a production build:

```bash
npm run build
```
