"use client";

import { Utensils, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <a
              href="#"
              className="flex items-center text-green-500 transition-transform duration-300 hover:scale-110"
            >
              <Utensils className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                ReMenu
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/auth/login">
              <Button
                variant="ghost"
                className="text-white hover:text-green-500 hover:bg-slate-800 transition-colors duration-300"
              >
                Iniciar Sesión
              </Button>
            </a>
            <a href="/auth/register">
              <Button className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-300">
                Crear Cuenta
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/auth/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-500 hover:bg-slate-800 transition-colors duration-300"
          >
            Iniciar Sesión
          </a>
          <a
            href="/auth/register"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-colors duration-300"
          >
            Crear Cuenta
          </a>
        </div>
      </div>
    </header>
  );
}
