"use client";

import { Utensils } from "lucide-react";
import LogoutButton from "./logout";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const supabase = createClient()
  const router = useRouter()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUserId(data.user.id);
      }
    };

    fetchUserId();
  });
  
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a href="/" className="block text-green-500">
              <span className="sr-only">ReMenu</span>
              <Utensils />
            </a>
          </div>

          <div className="md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white hover:text-white/75"
                    href="/dashboard"
                  >
                    Inicio
                  </a>
                </li>

                <li>
                  <a className="text-white hover:text-white/75" href={`/menu/${userId}`}>
                    Vista Previa del Menú
                  </a>
                </li>

                <li>
                  <a className="text-white hover:text-white/75" href="/dashboard/generar">
                    Generar Enlace y Código QR
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-green-700" />
    </header>
  );
}
