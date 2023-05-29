import { useFetchGifs } from "@/hooks";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Tests on useFetchGifs hook", () => {
  test("should return initial state", () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));
    const { gifs, isLoading } = result.current;
    expect(gifs).toEqual([]);
    expect(isLoading).toBe(true);
  });

  test("should return an array of images and isLoading in false", async () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { gifs, isLoading } = result.current;

    expect(gifs.length).toBeGreaterThan(0);
    expect(isLoading).toBe(false);
  });

  test("should load more gifs when handleLoadMore is called and isLoading in false", async () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { handleLoadMore } = result.current;

    const initialLength = result.current.gifs.length;

    act(() => {
      handleLoadMore();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { gifs, isLoading } = result.current;

    expect(gifs.length).toBeGreaterThan(initialLength);
    expect(isLoading).toBe(false);
  });
});
