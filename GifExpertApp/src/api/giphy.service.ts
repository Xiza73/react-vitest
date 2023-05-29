import { getEnviroments } from "@/config";
import { Gif } from "@/interfaces";
import { getJson } from "./config";

const apiUri = "https://api.giphy.com/v1/gifs";

export const getGifs = async (
  category: string,
  options: {
    limit?: number;
    offset?: number;
  }
): Promise<Gif[]> => {
  const res = await getJson(
    `${apiUri}/search?q=${encodeURI(category)}&limit=${
      options.limit || 8
    }&offset=${options.offset || 0}&api_key=${getEnviroments().GIPHY_API_KEY}`
  );

  const gifs = res.data.map((gif: any) => {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images.downsized_medium.url,
    };
  });

  return gifs;
};
