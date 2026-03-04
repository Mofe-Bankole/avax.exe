"use client";

import { useState, useEffect } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

interface IUser {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  walletAddress: string;
}

interface FormErrors {
  [key: string]: string;
}

export function OnboardingForm() {
  const router = useRouter();
  const { signUp, signIn } = useAuth();
  
  const { address } = useAccount();
  const [formData, setFormData] = useState<IUser>({
    username: "",
    email: "",
    avatar: "",
    bio: "",
    walletAddress: "",
  });

  // Sync walletAddress with wagmi address
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        walletAddress: address,
      }));
    }
  }, [address]);

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username?.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, underscores, and hyphens";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.walletAddress?.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    } else if (!/^(0x)?[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      newErrors.walletAddress = "Please enter a valid Ethereum wallet address";
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio must be 500 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    try {
      const result = await signUp(formData);
      if (result.success) {
        setSuccessMessage(result.message);
        // After successful signup, send the user straight to the feed/dashboard.
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to avax.exe
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your gaming profile to get started
          </p>
        </div>

        {/* Error message */}
        {errors.submit && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-destructive text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-primary text-sm">{successMessage}</p>
          </div>
        )}

        {/* Avatar Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">
            Profile Picture{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar || ""}
            onChange={handleInputChange}
            placeholder="Submit the link to your avatar"
            className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.avatar ? "border-destructive" : "border-border"
            }`}
          />{" "}
          <div className="relative">
            <div className="space-y-3">
              <label
                htmlFor="user name"
                className="block text-sm font-semibold text-foreground"
              >
                Username <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleInputChange}
                placeholder="Choose your gaming username"
                className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.username ? "border-destructive" : "border-border"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username}</p>
              )}
            </div>

            {errors.avatar && (
              <p className="text-xs text-destructive mt-2">{errors.avatar}</p>
            )}
          </div>
        </div>

        {/* Username */}
       

        {/* Email */}
        <div className="space-y-3">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground"
          >
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.email ? "border-destructive" : "border-border"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Wallet Address */}
        <div className="space-y-3">
          <label
            htmlFor="walletAddress"
            className="block text-sm font-semibold text-foreground"
          >
            Wallet Address <span className="text-destructive">*</span>
          </label>
          {!address ? (
            <ConnectButton label="Connect Wallet"></ConnectButton>
          ) : (
            address
          )}
          {errors.walletAddress && (
            <p className="text-xs text-destructive">{errors.walletAddress}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-foreground"
          >
            Bio <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            placeholder="Tell other gamers about yourself..."
            rows={4}
            maxLength={500}
            className={`w-full px-4 py-3 rounded-lg bg-muted border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.bio ? "border-destructive" : "border-border"
            }`}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {(formData.bio || "").length}/500 characters
            </p>
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${successMessage !== "" ? "disabled:" : ""} px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Creating your profile...
            </>
          ) : (
            successMessage || "Complete Onboarding"
          )}
        </button>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center">
          By completing onboarding, you agree to our Terms of Service and
          Privacy Policy
        </p>
      </form>
    </div>
  );
}
