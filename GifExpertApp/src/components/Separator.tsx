export interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => (
  <hr className={`w-full my-4 ${className}`} />
);
