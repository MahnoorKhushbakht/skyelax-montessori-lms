"use client";
import React from "react";
import Link from "next/link";
import { User, LogOut, BookOpen, CheckCircle, BrainCircuit } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({ role, children }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

      <aside className="w-64 bg-slate-900 text-white flex flex-col p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-8 px-2 border-b border-slate-800 pb-4">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="font-bold text-base tracking-wide">Montessori ERP</h1>
            <p className="text-xs text-slate-400">SKYELAX LMS</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {role === "TEACHER" && (
            <Link 
              href="/teacher" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm transition-all shadow"
            >
              <CheckCircle className="w-4 h-4" /> Attendance & Observations
            </Link>
          )}

          {role === "PARENT" && (
            <Link 
              href="/parent" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm transition-all shadow"
            >
              <BrainCircuit className="w-4 h-4" /> Child Progress & AI Reports
            </Link>
          )}

          {role === "ADMIN" && (
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm transition-all shadow"
            >
              <User className="w-4 h-4" /> School & User Management
            </Link>
          )}
        </nav>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
          <span className="capitalize font-mono">Role: {role?.toLowerCase()}</span>
          <Link href="/login" className="hover:text-red-400 transition-colors p-1">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

 
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-4 flex justify-end"><ThemeToggle /></div>
        {children}
      </main>
    </div>
  );
}