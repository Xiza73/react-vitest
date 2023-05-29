import { Gif } from "@/interfaces";
import { useEffect, useState } from "react";
import * as services from "@/api";

export const useFetchGifs = (category: string) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [noMoreGifs, setNoMoreGifs] = useState<boolean>(false);

  const getGifs = async () => {
    try {
      setIsLoading(true);
      const items = await services.getGifs(category, { offset });
      if (items.length === 0) return setNoMoreGifs(true);
      setGifs([...gifs, ...items]);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGifs();
  }, [category, offset]);

  const handleLoadMore = () => setOffset((prevOffset) => prevOffset + 8);

  return {
    gifs,
    isLoading,
    error,
    noMoreGifs,
    handleLoadMore,
  };
};
