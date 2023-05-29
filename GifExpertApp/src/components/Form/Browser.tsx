import { Button, Input } from "..";

export interface BrowserProps {
  buttonText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  value: string;
}

export const Browser: React.FC<BrowserProps> = ({
  buttonText,
  onChange,
  onSubmit,
  placeholder,
  value,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && onSubmit();

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center gap-3 mb-5">
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Button text={buttonText} onClick={onSubmit} />
    </div>
  );
};
