export interface ButtonProps {
  text: string;
  onClick: (input?: string) => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <button onClick={() => onClick()}>{text}</button>;
};
