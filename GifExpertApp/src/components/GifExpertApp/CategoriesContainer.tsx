import { GifsContainer } from ".";

export interface CategoriesContainerProps {
  titles: string[];
}

export const CategoriesContainer: React.FC<CategoriesContainerProps> = ({
  titles,
}) => {
  return (
    <ol>
      {titles.map((title) => (
        <li key={title}>
          <GifsContainer title={title} />
        </li>
      ))}
    </ol>
  );
};
