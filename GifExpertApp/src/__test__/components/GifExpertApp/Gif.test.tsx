import { Gif } from "@/components";
import { render, screen } from "@testing-library/react";

describe("Tests on <Gif />", () => {
  const url =
    "https://media4.giphy.com/media/VXJWhaO7afRe/giphy.gif?cid=cbc864d562njk1yjdf11bs5adtruz31d04dgw2r9md92ug43&rid=giphy.gif&ct=g";
  const title = "One Punch Man";

  test("should show the snapshot", () => {
    const { container } = render(<Gif url={url} title={title} />);
    expect(container).toMatchSnapshot();
  });

  test("should show the image with the correct alt and url", () => {
    render(<Gif url={url} title={title} />);

    const { src, alt } = screen.getByRole<HTMLImageElement>("img");

    expect(src).toBe(url);
    expect(alt).toBe(title);
  });
});
