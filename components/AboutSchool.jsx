"use client";

import React from "react";
import { Compass, Heart, Award, Sparkles, BookOpen, Users } from "lucide-react";

export default function AboutSchool() {
  const pillars = [
    {
      title: "Practical Life",
      description: "Building concentration, fine motor skills, and daily independence through hands-on activities.",
      icon: Heart,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Sensorial Exploration",
      description: "Refining five senses to classify, compare, and understand spatial relationships in nature.",
      icon: Compass,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Mathematics & Language",
      description: "Concrete-to-abstract learning with Montessori beads, sandpaper letters, and guided storytelling.",
      icon: BookOpen,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Cultural & Science",
      description: "Inspiring global curiosity through geography, botany, music, and peaceful social collaboration.",
      icon: Users,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-slate-950/60 border-t border-b border-slate-800/60 text-white">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
     
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide">
               Our Educational Theory
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Nurturing Independent Minds & Lifelong Learners
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Little Explorers Montessori is founded on authentic Maria Montessori principles. We prepare thoughtful classroom environments that respect each child’s unique developmental pace, encouraging self-directed exploration, confidence, and critical thinking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit border ${pillar.accent}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

  
        <div className="bg-linear-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/40 border border-slate-800/80 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-white">1:8</p>
            <p className="text-xs text-slate-400 mt-1">Guide to Child Ratio</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400">100%</p>
            <p className="text-xs text-slate-400 mt-1">Prepared Environment</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-indigo-400">Real-Time</p>
            <p className="text-xs text-slate-400 mt-1">AI Progress Digests</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-amber-400">AMI</p>
            <p className="text-xs text-slate-400 mt-1">Certified Methodology</p>
          </div>
        </div>

      </div>
    </section>
  );
}