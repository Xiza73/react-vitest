# Vitest for Vite-React App

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 18.0.0)
- [Yarn](https://yarnpkg.com/en/docs/install) (>= 1.0.0)

### Install

```bash
yarn add -D vitest @vitest/ui jsdom @testing-library/react
```

### Configure

- `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

- `vite.config.js`:

```ts
/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- `tsconfig.json`:

```json
{
  "compilerOptions": {
    "...": "...",
    "types": ["vitest/globals"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
---

## Usage

### Writing Tests

Create a test file in the same directory as the component you want to test. For example, if you have a component at `src/components/MyComponent.tsx`, create a test file at `src/__test__/components/MyComponent.test.tsx`.

```tsx
import { render, screen } from "@testing-library/react";

import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  test("renders", () => {
    render(<MyComponent />);

    expect(screen.getByText("Hello, world!")).toBeTruthy();
  });
});
```

### Tests on Services

For test a service like the following:

`src/services/MyService.ts`:

```ts
export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return users;
};
```

We can create a test file at `src/__test__/services/MyService.test.ts`:

```ts
import { getUsers } from "@/services/MyService";

describe("MyService", () => {
  test("getUsers", async () => {
    const users = await getUsers();

    expect(users).toHaveLength(10);
  });
});
```

### The render function and screen object

Many times we need to use the `screen` object to get elements from the DOM, we can import it from `@testing-library/react`:

```ts
import { render, screen } from "@testing-library/react";
```

A simple example to use the `screen` object and `render` function:

```tsx
import { render, screen } from "@testing-library/react";

import MyComponent from "./MyComponent";

describe("Tests on <MyComponent />", () => {
  const category = "One Punch";

  test("should match the snapshot", () => {
    const { container } = render(<MyComponent />);
    expect(container).toMatchSnapshot();
  });

  test("should show loading text", () => {
    render(<MyComponent />);
    expect(screen.getByText("Loading...")).toBeTruthy();
  });
});
```

More examples of the `screen` object:

```tsx
screen.queryByText(/loading.../i) // returns an element with the text "loading..." or null if no element is found

screen.getAllByRole("button") // returns an array of elements with the role "button"

screen.getAllByRole("heading", { level: 2 }) // returns an array of elements <h2>
```

### Tests on Custom Hooks

For test a custom hook we need some functions like `waitFor` from `@testing-library/react` and `act` from `react-dom/test-utils`:

Some examples for our useCustomHook:

- For initial state: 

```ts
describe("Tests on useCustomHook", () => {
  test("should return the initial state", () => {
    const { result } = renderHook(() => useCustomHook());

    const { data, isLoading } = result.current;

    expect(data).toEqual([]);
    expect(isLoading).toBe(true);
  });
});
```

- For fetch data:

```ts
import { renderHook, waitFor } from "@testing-library/react";

describe("Tests on useCustomHook", () => {
  test("should return the data", async () => {
    const { result } = renderHook(() => useCustomHook());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { data, isLoading } = result.current;

    expect(data.length).toBeGreaterThan(0);
    expect(isLoading).toBe(false);
  });
});
```

- And maybe we need to use a handler inside the custom hook:

```ts
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Tests on useCustomHook", () => {
  test("should load more data", async () => {
    const { result } = renderHook(() => useCustomHook());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { handleLoadMore } = result.current;
    const initialLength = result.current.data.length;

    act(() => {
      handleLoadMore();
    });

    expect(isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(data.length).toBeGreaterThan(initialLength);
    expect(isLoading).toBe(false);
  });
});
```

But, how do we test a component that uses a custom hook?

We need to mock the custom hook, and use our fireEvent to simulate the user interaction, let's see an example.

- Imports:

```ts
import { render, screen, fireEvent } from "@testing-library/react";
import { Mock } from "vitest";

import MyComponent from "./MyComponent";
import { useCustomHook } from "@/hooks/useCustomHook";
```

- Mock the custom hook:

```ts
// vi is the global variable of vitest
vi.mock("@/hooks/useCustomHook", () => ({
  const useCustomHook = vi.fn(() => ({
    data: [],
    isLoading: true,
    handleLoadMore: vi.fn(),
  }));

  return { useCustomHook };
}));
```

- Using our custom hook as a mock:

```ts
const handleLoadMore = () => {
  data.push({
    id: "ABC",
    title: "ABC",
    url: "https://localhost/ABC",
  });
};

(useCustomHook as Mock).mockReturnValue({
  data: gifs,
  isLoading: false,
  handleLoadMore: vi.fn(handleLoadMore),
});
```

- Let's test the component:

```ts
describe("Tests on <MyComponent />", () => {
  test("should show the data when are loaded", () => {
    const data = [
      {
        id: "ABC",
        title: "ABC",
        url: "https://localhost/ABC",
      },
      {
        id: "DEF",
        title: "DEF",
        url: "https://localhost/DEF",
      },
    ];

    (useCustomHook as Mock).mockReturnValue({
      data,
      isLoading: false,
      handleLoadMore: vi.fn(),
    });

    render(<MyComponent />);

    expect(screen.queryByText(/loading.../i)).toBeNull();
    expect(screen.getAllByRole("img").length).toBe(data.length);
  });

  test("should show more data when the user clicks the button", () => {
    const data = [
      {
        id: "ABC",
        title: "ABC",
        url: "https://localhost/ABC",
      },
      {
        id: "DEF",
        title: "DEF",
        url: "https://localhost/DEF",
      },
    ];

    const handleLoadMore = () => {
      data.push({
        id: "GHI",
        title: "GHI",
        url: "https://localhost/GHI",
      });
    };

    (useCustomHook as Mock).mockReturnValue({
      data,
      isLoading: false,
      handleLoadMore: vi.fn(handleLoadMore),
    });

    const { container } = render(<MyComponent />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    (useCustomHook as Mock).mockReturnValue({
      data,
      isLoading: false,
      handleLoadMore: vi.fn(handleLoadMore),
    });

    render(<MyComponent />, { container });

    expect(screen.queryByText(/loading.../i)).toBeNull();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(2);
  });
});
```


