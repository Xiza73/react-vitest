import { GifsContainer } from ".";

export interface CategoriesContainerProps {
  titles: string[];
}

export const CategoriesContainer: React.FC<CategoriesContainerProps> = ({
  titles,
}) => {
  return (
    <ol className="w-full lg:w-2/3 flex flex-col items-center justify-center gap-3">
      {titles.map((title) => (
        <li
          className="w-full flex flex-col items-center justify-center gap-3 mb-2"
          key={title}
        >
          <GifsContainer title={title} />
        </li>
      ))}
    </ol>
  );
};
