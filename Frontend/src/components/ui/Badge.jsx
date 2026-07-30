import "./Badge.css";

function Badge({ text, type = "info" }) {
    return (
        <span className={`badge badge-${type}`}>
            {text}
        </span>
    );
}

export default Badge;