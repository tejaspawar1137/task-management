import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import GoogleLogo from "../assets/google-logo.png";
import toast from "react-hot-toast";
// Validation Schema
const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
const AuthPage = () => {
    const navigate = useNavigate();
    // Tabs: "login" or "signup"
    const [activeTab, setActiveTab] = useState("login");
    const [error, setError] = useState("");
    // Initialize React Hook Form with Zod schema
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    // Toast helpers
    const googleLogin = () => toast("Google Login Successful! ✅");
    const normalLogin = () => toast("Login Successful! ✅");
    // Google Auth
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
            googleLogin();
        }
        catch (err) {
            setError("Failed to sign in with Google");
        }
    };
    // Email/Password Login
    const handleLogin = async (data) => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            normalLogin();
            navigate("/dashboard");
        }
        catch (err) {
            setError("Please enter valid credentials");
        }
    };
    // Email/Password Signup
    const handleSignup = async (data) => {
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Signup Successful! ✅");
            navigate("/dashboard");
        }
        catch (err) {
            setError("Email already exists");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 p-4", children: _jsxs("div", { className: "w-full max-w-md bg-white rounded-lg shadow-lg p-6", children: [_jsxs("div", { className: "flex border-b mb-6", children: [_jsx("button", { className: `flex-1 py-2 text-center ${activeTab === "login"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"}`, onClick: () => setActiveTab("login"), children: "Login" }), _jsx("button", { className: `flex-1 py-2 text-center ${activeTab === "signup"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"}`, onClick: () => setActiveTab("signup"), children: "Sign Up" })] }), error && _jsx("p", { className: "text-red-500 text-sm mb-4", children: error }), activeTab === "login" ? (_jsxs("form", { onSubmit: handleSubmit(handleLogin), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("input", { type: "email", className: "w-full px-3 py-2 border border-gray-300 rounded-md", placeholder: "Enter your email", ...register("email") }), errors.email && (_jsx("p", { className: "text-red-500 text-sm", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "password", className: "w-full px-3 py-2 border border-gray-300 rounded-md", placeholder: "Enter your password", ...register("password") }), errors.password && (_jsx("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600", children: "Login" })] })) : (
                // Signup Form
                _jsxs("form", { onSubmit: handleSubmit(handleSignup), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("input", { type: "text", className: "w-full px-3 py-2 border border-gray-300 rounded-md", placeholder: "Enter your name", ...register("name") }), errors.name && (_jsx("p", { className: "text-red-500 text-sm", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "email", className: "w-full px-3 py-2 border border-gray-300 rounded-md", placeholder: "Enter your email", ...register("email") }), errors.email && (_jsx("p", { className: "text-red-500 text-sm", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "password", className: "w-full px-3 py-2 border border-gray-300 rounded-md", placeholder: "Create a password", ...register("password") }), errors.password && (_jsx("p", { className: "text-red-500 text-sm", children: errors.password.message }))] }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600", children: "Sign Up" })] })), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Or continue with" }) })] }), _jsxs("button", { onClick: handleGoogleLogin, className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50", children: [_jsx("img", { src: GoogleLogo, alt: "Google", className: "h-5 w-5 mr-2" }), "Continue with Google"] })] }) }));
};
export default AuthPage;
