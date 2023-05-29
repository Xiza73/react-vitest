export interface GifProps {
  url: string;
  title: string;
}

export const Gif: React.FC<GifProps> = ({ url, title }) => {
  return (
    <article className="flex items-center justify-center">
      <img src={url} alt={title} className="w-full rounded-md" />
    </article>
  );
};
