"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Loader2, ArrowRight, AlertTriangle } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (code: string | null) => {
    if (!code) return null;
    switch (code) {
      case "AccessDenied":
        return "Access Denied. Your Google account is not authorized to access this admin panel.";
      case "Configuration":
        return "OAuth Configuration Error. Please verify your Google Client ID and Secret settings.";
      case "OAuthSignin":
      case "OAuthCallbackError":
        return "Authentication with Google failed or was cancelled. Please try again.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  const errorMessage = getErrorMessage(errorCode);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/admin" });
    } catch (err) {
      console.error("Sign-in error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Brand / Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 shadow-inner">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Admin Portal
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Sign in with your authorized Google account
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[#121318]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Authentication Error</p>
              <p className="text-xs text-rose-300/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-slate-700" />
              <span className="text-slate-700">Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4 text-slate-500 transition-transform group-hover:translate-x-1 ml-auto" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500">
          Only pre-authorized administrator Google accounts can access the CMS.
        </p>
      </div>

      <div className="text-center mt-6">
        <a
          href="/"
          className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
        >
          ← Back to Public Website
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-slate-400 text-sm">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
