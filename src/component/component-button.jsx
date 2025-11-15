import { Link } from "react-router-dom";
function Button({
  text,
  variant = "filled",
  onClick,
  className = "",
  marginTop,
  href,
  children, 
}) {
  const baseStyle = `
    text-[15px] font-semibold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${marginTop}
  `;

  const variantStyle =
    variant === "filled"
      ? "bg-[#2563EB] hover:bg-[#1E4FC3] text-white"
      : "border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white";

      const Element = href ? Link : "button"; 
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      <a href={href} className="flex items-center gap-2">
        {children ? children : text}
      </a>
    </button>
  );
}

export default Button;
