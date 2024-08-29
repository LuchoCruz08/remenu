import { Utensils, Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/lib/actions";

export default function Login() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-slate-800 border-gray-700 shadow-2xl animate-fade-in-up">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <a
              href="/"
              className="flex items-center text-3xl font-bold text-green-500 hover:text-green-400 transition-colors duration-300"
            >
              <Utensils className="mr-2 h-8 w-8" />
              ReMenu
            </a>
          </div>
          <CardTitle className="text-2xl font-semibold text-white text-center">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Accede a tu cuenta para gestionar tu menú digital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ejemplo@gmail.com"
                  className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="******"
                  className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-500 hover:text-green-400"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <Button
              formAction={login}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <a
                href="/auth/register"
                className="font-medium text-green-500 hover:text-green-400 transition-colors duration-300"
              >
                Crear Cuenta
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
