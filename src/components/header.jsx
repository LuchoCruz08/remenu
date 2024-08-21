import { Utensils } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a href="#" className="flex text-green-500">
              <Utensils className="h-8" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a href="/auth/login">
                <Button>Iniciar Sesión</Button>
              </a>
            </div>

            <div className="sm:flex">
              <a href="/auth/register">
                <Button variant="secondary">Crear Cuenta</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
