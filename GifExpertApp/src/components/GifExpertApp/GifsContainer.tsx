import { useFetchGifs } from "@/hooks";
import { Gif } from ".";
import { Button } from "..";
import { Separator } from "../Separator";

export interface GifsContainerProps {
  title: string;
}

export const GifsContainer: React.FC<GifsContainerProps> = ({ title }) => {
  const { isLoading, gifs, noMoreGifs, handleLoadMore } = useFetchGifs(title);

  return (
    <>
      <h2 className="text-2xl font-bold mr-auto">{title}</h2>
      <ol className="w-full flex items-center justify-between flex-wrap gap-5">
        {gifs.map(({ id, title, url }) => (
          <li className="w-52 p-2 bg-gray-200 rounded-md" key={id}>
            <Gif title={title} url={url} />
          </li>
        ))}
      </ol>
      {noMoreGifs && (
        <p className="text-xl font-bold text-red-500">No hay más resultados</p>
      )}
      {!isLoading && !noMoreGifs && (
        <Button
          onClick={handleLoadMore}
          type="button"
          text="Load more"
          color="primary"
        />
      )}
      {isLoading && <p>Loading...</p>}
      <Separator />
    </>
  );
};
