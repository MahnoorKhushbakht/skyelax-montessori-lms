"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Users, ShieldCheck } from "lucide-react";

export default function RoleCards() {
  const cards = [
    {
      role: "TEACHER PORTAL",
      badge: "Montessori Guides",
      title: "Log Daily Observations",
      description: "Track Practical Life, Sensorial, and Mathematics milestones with instant AI insights.",
      href: "/teacher",
      cta: "Guide Portal",
      accent: "from-emerald-500/20 to-teal-600/30 text-emerald-400 border-emerald-500/30",
      buttonBg: "bg-emerald-600 hover:bg-emerald-500",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      role: "PARENT PORTAL",
      badge: "Family Connect",
      title: "Child Progress Feed",
      description: "Real-time updates on attendance, daily activity timelines, and developmental digests.",
      href: "/parent",
      cta: "Parent Portal",
      accent: "from-indigo-500/20 to-blue-600/30 text-indigo-400 border-indigo-500/30",
      buttonBg: "bg-indigo-600 hover:bg-indigo-500",
      icon: Users,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      role: "ADMIN CONSOLE",
      badge: "Campus Management",
      title: "Multi-Tenant Operations",
      description: "Manage teachers, student enrollments, and school metrics across isolated campuses.",
      href: "/admin",
      cta: "Admin Portal",
      accent: "from-amber-500/20 to-orange-600/30 text-amber-400 border-amber-500/30",
      buttonBg: "bg-amber-600 hover:bg-amber-500",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="flex flex-col gap-12 mt-8 max-w-7xl mx-auto w-full px-2 sm:px-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="relative bg-slate-900/30 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden transition-all duration-300"
          >
          
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-linear-to-r ${card.accent}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {card.role} • {card.badge}
                </span>
              </div>

           
              <div className="space-y-3">
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                  {card.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={card.href}
                  className={`inline-flex items-center gap-2 text-xs font-semibold text-white px-6 py-3.5 rounded-xl transition-all shadow-md ${card.buttonBg}`}
                >
                  <IconComponent className="w-4 h-4" />
                  Launch {card.cta}
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Learn Access Controls <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            
            <div className="lg:col-span-5 relative h-64 lg:h-88 w-full rounded-2xl overflow-hidden group">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-xl font-bold text-white tracking-wide">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  Explore Feature <ArrowRight className="w-3 h-3 text-white" />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}