export interface ButtonProps {
  color?: "primary" | "secondary";
  onClick: (input?: string) => void;
  text: string;
  type?: "button" | "submit" | "reset";
}

const colorOptions = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white",
  secondary: "bg-gray-500 hover:bg-gray-700 text-white",
};

export const Button: React.FC<ButtonProps> = ({
  color = "primary",
  onClick,
  text,
  type = "button",
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${colorOptions[color]}`}
      onClick={() => onClick()}
      type={type}
    >
      {text}
    </button>
  );
};
