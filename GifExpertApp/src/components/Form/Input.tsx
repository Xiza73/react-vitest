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
  return <input className={`${className}`} {...props} />;
};
