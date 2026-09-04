"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, UserPlus } from "lucide-react";
import { schoolConfig } from "@/config/schoolConfig";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARENT",
    schoolId: "",
  });
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/schools");
        if (!response.ok) return;
        const data = await response.json();
        const schoolList = Array.isArray(data.schools) ? data.schools : [];
        setSchools(schoolList);
        if (schoolList.length > 0) {
          setForm((current) => ({ ...current, schoolId: current.schoolId || schoolList[0].id }));
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || form.password.length < 8 || !form.schoolId) {
      setState({ loading: false, error: "Complete all fields and use a password of at least 8 characters.", success: "" });
      return;
    }

    try {
      setState({ loading: true, error: "", success: "" });
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      setState({ loading: false, error: "", success: "Registration successful. Redirecting to login..." });
      window.setTimeout(() => router.push("/login"), 800);
    } catch (error) {
      console.error("Error registering:", error);
      setState({ loading: false, error: error.message || "Unable to register.", success: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl mb-2">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{schoolConfig.shortName}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Create your learning portal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["name", "Full Name", "text"],
            ["email", "Email Address", "email"],
            ["password", "Password", "password"],
          ].map(([field, label, type]) => (
            <label key={field} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              {label}
              <Input
                type={type}
                value={form[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                className="mt-1 w-full bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </label>
          ))}

          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Role
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              className="mt-1 w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
            >
              <option value="PARENT">Parent</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </label>

          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            School
            {schools.length > 0 ? (
              <select
                value={form.schoolId}
                onChange={(event) => setForm({ ...form, schoolId: event.target.value })}
                className="mt-1 w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              >
                <option value="">Select a school</option>
                {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
              </select>
            ) : (
              <Input
                value={form.schoolId}
                onChange={(event) => setForm({ ...form, schoolId: event.target.value })}
                className="mt-1 w-full bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                placeholder="School ID"
                required
              />
            )}
          </label>

          {state.error && <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">{state.error}</p>}
          {state.success && <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-700">{state.success}</p>}

          <Button type="submit" disabled={state.loading} className="w-full">
            <UserPlus className="w-4 h-4" /> {state.loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account? <Link href="/login" className="font-semibold text-emerald-600">Log in</Link>
        </p>
      </Card>
    </div>
  );
}