import { getGifs } from "@/api";

describe("Tests for GiphyServices", () => {
  describe("Tests on getGifs", () => {
    test("should return a list of gifs", async () => {
      const gifs = await getGifs("One Punch", {});
      expect(gifs.length).toBeGreaterThan(0);
    });
  });
});
