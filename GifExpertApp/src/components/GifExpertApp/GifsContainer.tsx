import { useFetchGifs } from "@/hooks";
import { Gif } from ".";

export interface GifsContainerProps {
  title: string;
}

export const GifsContainer: React.FC<GifsContainerProps> = ({ title }) => {
  const { isLoading, gifs, noMoreGifs, handleLoadMore } = useFetchGifs(title);

  return (
    <>
      <h2>{title}</h2>
      <ol>
        {gifs.map(({ id, title, url }) => (
          <li key={id}>
            <Gif title={title} url={url} />
          </li>
        ))}
      </ol>
      {!isLoading && !noMoreGifs && (
        <button onClick={handleLoadMore} type="button">
          Load More
        </button>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};
