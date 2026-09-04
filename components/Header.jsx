"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Menu, 
  X,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { schoolConfig } from "@/config/schoolConfig";
import ThemeToggle from "@/components/ThemeToggle";
const navigation = [
  { name: "Teacher Portal", href: "/teacher" },
  { name: "Parent Portal", href: "/parent" },
  { name: "Admin Console", href: "/admin" },
];


export default function Header() {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
              <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto">
                  <div className="flex lg:flex-1 items-center gap-3">
   
                    <div>
                      <span className="font-bold text-lg tracking-wide text-white block">{schoolConfig.name}</span>
                      <span className="text-[10px] text-emerald-400 block -mt-1 font-medium">{schoolConfig.tagline}</span>
                    </div>
                  </div>
        
                  <div className="flex lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white"
                    >
                      <span className="sr-only">Open main menu</span>
                      <Menu className="w-6 h-6" />
                    </button>
                  </div>
        
                  <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    ))}
                  </div>
        
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
                    <ThemeToggle />
                    <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                      <ShieldCheck className="w-4 h-4" /> Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </nav>
        
           
                {mobileMenuOpen && (
                  <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/95 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Compass className="w-6 h-6 text-emerald-500" />
                          <span className="font-bold text-white">{schoolConfig.shortName}</span>
                        </div>
                        <ThemeToggle />
                        <button
                          type="button"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-m-2.5 rounded-md p-2.5 text-gray-200 hover:text-white"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="w-6 h-6" />
                        </button>
                      </div>
        
                      <div className="mt-8 space-y-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
        
                    <div className="pt-6 border-t border-gray-800">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <ShieldCheck className="w-4 h-4" /> Log in
                      </Link>
                    </div>
                  </div>
                )}
              </header>
    );

}