import { CategoriesContainer } from "@/components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Tests on <CategoriesContainer />", () => {
  const titles = ["One Punch", "Dragon Ball"];

  test("should match the snapshot", () => {
    const { container } = render(<CategoriesContainer titles={titles} />);

    expect(container).toMatchSnapshot();
  });

  test("should show the titles", () => {
    render(<CategoriesContainer titles={titles} />);

    titles.forEach((title) => {
      expect(screen.queryByText(new RegExp(title, "i"))).toBeTruthy();
    });
  });

  test("should show the gifs by category", async () => {
    render(<CategoriesContainer titles={titles} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).toBeNull();
    });

    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img").length).toBe(titles.length * 8);
  });

  test("should show more gifs when Load More button is clicked", async () => {
    render(<CategoriesContainer titles={titles} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).toBeNull();
    });

    const btn = screen.queryAllByText(/load more/i)[0];

    act(() => {
      fireEvent.click(btn);
    });

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).toBeNull();
    });

    expect(screen.getAllByRole("img").length).toBeGreaterThan(
      titles.length * 8
    );
  });
});
