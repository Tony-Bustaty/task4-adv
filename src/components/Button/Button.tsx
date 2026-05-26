import { Link } from "react-router";
import "./Button.css";
interface ButtonProps {
  content: string;
  onClick?: () => void;
  type: "submit" | "button";
  isLoading?: boolean;
  link?: string;
  className?: string;
}
function Button({
  content,
  type,
  onClick,
  isLoading,
  link,
  className,
}: ButtonProps) {
  return (
    <button type={type} disabled={isLoading} onClick={onClick} className={className || undefined}>
      {isLoading ? (
        <p>loading...</p>
      ) : link ? (
        <Link to={link}>
          <p>{content}</p>
        </Link>
      ) : (
        <p>{content}</p>
      )}
    </button>
  );
}

export default Button;
