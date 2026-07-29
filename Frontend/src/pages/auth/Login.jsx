import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import PageTitle from "../../components/common/PageTitle";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    function handleLogin() {

        if (email === "" || password === "") {
            alert("Please fill all fields.");
            return;
        }
        setLoading(true);

        setTimeout(() => {
            console.log("Email:", email);
            console.log("Password:", password);

            setMessage("Login Successful!");

            setLoading(false);
            setEmail("");
            setPassword("");
        }, 2000);

        return;
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f7fc",
            }}
        >
            <Card>
                <PageTitle title="Welcome Back" />
                <p>Please sign in to continue...</p>
                {message && (
                    <p
                        style={{
                            color: "green",
                            background: "#e8f5e9",
                            padding: "10px",
                            borderRadius: "6px",
                            marginBottom: "15px",
                            fontWeight: "600",
                        }}
                    >
                        {message}
                    </p>
                )}
                <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        fontSize: "14px",
                    }}
                >
                    <label>
                        <input type="checkbox" />
                        {" "}Remember Me
                    </label>

                    <a href="#">Forgot Password?</a>
                </div>
                <Button
                    variant="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </Button>
            </Card>
        </div>
    );
}

export default Login;