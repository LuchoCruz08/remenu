import { Button } from "@/components/ui/button"
import { ArrowRight, Utensils, QrCode } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl animate-fade-in-up">
            Moderniza tu negocio con
            <strong className="block font-extrabold bg-gradient-to-r from-green-400 to-emerald-700 bg-clip-text text-transparent animate-pulse">
              ReMenu
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white text-lg sm:text-xl/relaxed animate-fade-in-up animation-delay-200">
            Con <strong className="text-green-400">ReMenu</strong> podrás crear, organizar y actualizar el
            menú de tu restaurante y compartirlo con tus clientes mediante
            enlaces o códigos QR!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center sm:justify-start animate-fade-in-up animation-delay-400">
            <a href="/auth/login">
              <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center">
                Iniciar Sesión
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="/auth/register">
              <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Crear Cuenta
              </Button>
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center sm:justify-start space-x-6 animate-fade-in-up animation-delay-600">
            <div className="flex items-center">
              <Utensils className="h-8 w-8 text-green-400 mr-2" />
              <span className="text-white">Menús Digitales</span>
            </div>
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-green-400 mr-2" />
              <span className="text-white">Códigos QR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}