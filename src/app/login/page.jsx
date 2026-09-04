"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ShieldCheck, Sun, Moon } from "lucide-react";
import { schoolConfig } from "@/config/schoolConfig";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("PARENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Authentication failed");

      const user = data.user;

      if (user.role !== role) {
        throw new Error(`Account registered as ${user.role}, not ${role}.`);
      }

      // Save Auth Cookies
      document.cookie = `userRole=${user.role}; path=/`;
      document.cookie = `userId=${user.id}; path=/`;

      if (user.role === "PARENT") {
        document.cookie = `parentId=${user.id}; path=/`;
      }

      router.push(`/${user.role.toLowerCase()}`);
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 transition-colors">
      <Card className="rounded-2xl p-8 max-w-md w-full space-y-6 relative">
        
       
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

     
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 bg-emerald-950/60 text-emerald-400 rounded-xl mb-2 border border-emerald-800/40">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {schoolConfig?.shortName || "Little Explorers"}
          </h1>
          <p className="text-xs text-slate-400">Learning & ERP Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select User Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-700 rounded-lg p-2.5 text-sm bg-slate-800 text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="PARENT">Parent Portal</option>
              <option value="TEACHER">Teacher / Educator</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

     
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-slate-700 rounded-lg p-2.5 text-sm bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

    
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-slate-700 rounded-lg p-2.5 text-sm bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="text-right -mt-2">
            <Link href="/forgot-password" className="text-xs text-emerald-400 hover:text-emerald-300">
              Forgot Password?
            </Link>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="rounded-lg border border-red-900 bg-red-950/60 p-2.5 text-xs text-red-400">
              {error}
            </div>
          )}

        
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            {submitting ? "Signing in..." : "Enter Portal"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-emerald-400 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}