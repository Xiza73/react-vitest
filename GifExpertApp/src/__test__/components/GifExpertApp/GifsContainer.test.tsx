import { GifsContainer } from "@/components";
import { useFetchGifs } from "@/hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import { Mock } from "vitest";

vi.mock("@/hooks/useFetchGifs", () => {
  const useFetchGifs = vi.fn(() => ({
    isLoading: true,
    gifs: [],
    handleLoadMore: vi.fn(),
  }));

  return { useFetchGifs };
});

describe("Tests on <GifsContainer />", () => {
  const category = "One Punch";

  test("should match the snapshot", () => {
    const { container } = render(<GifsContainer title={category} />);
    expect(container).toMatchSnapshot();
  });

  test("should show loading text", () => {
    render(<GifsContainer title={category} />);
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("should show the items when the images are loaded", () => {
    const gifs = [
      {
        id: "ABC",
        url: "https://localhost/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      },
      {
        id: "123",
        url: "https://localhost/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      },
    ];

    (useFetchGifs as Mock).mockReturnValue({
      isLoading: false,
      gifs,
    });

    render(<GifsContainer title={category} />);

    // screen.debug();

    expect(screen.queryByText(/loading.../i)).toBeNull();
    expect(screen.getAllByRole("img").length).toBe(gifs.length);
  });

  test("should show more items when Load More button is clicked", async () => {
    const gifs = [
      {
        id: "ABC",
        url: "https://localhost/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      },
      {
        id: "123",
        url: "https://localhost/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      },
    ];

    const handleLoadMore = () => {
      gifs.push({
        id: "456",
        url: "https://localhost/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      });
    };

    (useFetchGifs as Mock).mockReturnValue({
      isLoading: false,
      gifs,
      handleLoadMore: vi.fn(handleLoadMore),
    });

    const { container } = render(<GifsContainer title={category} />);

    const button = screen.getByRole<HTMLButtonElement>("button");

    fireEvent.click(button);

    (useFetchGifs as Mock).mockReturnValue({
      isLoading: false,
      gifs,
    });

    render(<GifsContainer title={category} />, { container });

    // expect(button.onclick).toHaveBeenCalled();
    expect(screen.queryByText(/loading.../i)).toBeNull();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(2);
  });
});
