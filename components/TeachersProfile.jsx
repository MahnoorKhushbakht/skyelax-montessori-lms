"use client";

import React from "react";
import { Sparkles, Mail, Award, BookOpen } from "lucide-react";

export default function TeachersProfile() {
  const teachers = [
    {
      name: "Sarah Jenkins",
      role: "Lead Primary Guide",
      cert: "AMI Certified",
      bio: "With over 10 years of experience, Sarah specializes in the 3-6 years age group, fostering independence and a deep love for mathematics and practical life.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "David Chen",
      role: "Sensorial & Language Specialist",
      cert: "AMS Certified",
      bio: "David brings a creative approach to language arts and sensorial exploration, helping children articulate their thoughts and understand their environment.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80",
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      name: "Elena Rodriguez",
      role: "Toddler Community Directress",
      cert: "AMI Toddler Certified",
      bio: "Elena guides our youngest learners (18-36 months) with immense patience, focusing on motor skills, early vocabulary, and emotional regulation.",
      image: "https://images.unsplash.com/photo-1580820267675-9728f6f89252?auto=format&fit=crop&w=800&q=80",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-slate-950 text-white">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        

        <div className="text-center space-y-4 max-w-2xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Meet Our Montessori Guides
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Our certified educators observe, guide, and inspire. They are trained to connect your child with the prepared environment, ensuring a personalized learning journey.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700/80 transition-all duration-300 group flex flex-col shadow-xl"
            >

              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent" />
                

                <div className={`absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-bold ${teacher.accent}`}>
                  <Award className="w-3.5 h-3.5" /> {teacher.cert}
                </div>
              </div>


              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-sm font-medium text-indigo-400 mt-1">
                    {teacher.role}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mt-4">
                    {teacher.bio}
                  </p>
                </div>


                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4">
                  <button className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg font-semibold text-xs border border-indigo-500/20 transition-colors">
                    <BookOpen className="w-4 h-4" /> View Class Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}