"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyRound, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { schoolConfig } from "@/config/schoolConfig";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setState({ loading: false, error: "Please enter your email address.", success: "" });
      return;
    }

    try {
      setState({ loading: true, error: "", success: "" });
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send reset link.");
      setState({ loading: false, error: "", success: data.message });
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setState({ loading: false, error: error.message || "Unable to send reset link.", success: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">{schoolConfig.shortName}</h1>
          <p className="text-sm text-slate-400">Reset your portal password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold text-slate-300">
            Email Address
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="mt-1 bg-slate-800 text-white border-slate-700"
              required
            />
          </label>
          {state.error && <p className="rounded-lg border border-red-900 bg-red-950/60 p-2.5 text-xs text-red-400">{state.error}</p>}
          {state.success && <p className="rounded-lg border border-emerald-800 bg-emerald-950/60 p-2.5 text-xs text-emerald-300">{state.success}</p>}
          <Button type="submit" disabled={state.loading} className="w-full">
            {state.loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <Link href="/login" className="flex items-center justify-center gap-2 text-xs text-emerald-400 hover:text-emerald-300">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </Link>
      </Card>
    </div>
  );
}
