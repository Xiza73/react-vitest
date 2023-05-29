export interface InputProps {
  className?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value: string | number;
}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`p-2 border-2 border-gray-300 rounded-md grow ${className}`}
      {...props}
    />
  );
};
