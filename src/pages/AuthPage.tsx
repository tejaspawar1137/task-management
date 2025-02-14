import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleLogo from "../assets/google-logo.png";
import toast from "react-hot-toast";

// Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof schema>;

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  // Tabs: "login" or "signup"
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string>("");

  // Initialize React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
    } catch (err: unknown) {
      // You can narrow err if you want: (err as FirebaseError)
      setError("Failed to sign in with Google");
    }
  };

  // Email/Password Login
  const handleLogin: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      normalLogin();
      navigate("/dashboard");
    } catch (err: unknown) {
      setError("Please enter valid credentials");
    }
  };

  // Email/Password Signup
  const handleSignup: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signup Successful! ✅");
      navigate("/dashboard");
    } catch (err: unknown) {
      setError("Email already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        {activeTab === "login" ? (
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Create a password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <img src={GoogleLogo} alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
