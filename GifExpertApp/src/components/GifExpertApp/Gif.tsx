export interface GifProps {
  url: string;
  title: string;
}

export const Gif: React.FC<GifProps> = ({ url, title }) => {
  return (
    <article>
      <img src={url} alt={title} />
    </article>
  );
};
