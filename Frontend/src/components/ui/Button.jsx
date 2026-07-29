import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
}) {

const buttonClass = `btn btn-${variant} btn-${size} ${fullWidth ? "btn-full-width" : ""} ${className}`;

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;