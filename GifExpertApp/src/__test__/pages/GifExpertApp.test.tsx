import { GifExpertApp } from "@/pages";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Tests on <GifExpertApp />", () => {
  const value = "Yoda";

  test("should match the snapshot", () => {
    const { container } = render(<GifExpertApp />);

    expect(container).toMatchSnapshot();
  });

  test("should show a list of categories", () => {
    render(<GifExpertApp />);

    const headers = screen.getAllByRole("heading", { level: 2 });

    expect(headers.length).toBe(2);
  });

  test("should change the browser input", () => {
    render(<GifExpertApp />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/buscar gifs.../i);

    fireEvent.change(input, { target: { value } });

    expect(input.value).toBe(value);
  });

  test("should add a category when the form is submitted", () => {
    render(<GifExpertApp />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/buscar gifs.../i);

    
    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /agregar/i,
    });

    fireEvent.change(input, { target: { value } });

    expect(input.value).toBe(value);

    fireEvent.click(button);
    const headers = screen.getAllByRole("heading", { level: 2 });

    expect(headers.length).toBe(3);
    expect(input.value).toBe("");
  });
});
