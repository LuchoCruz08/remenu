import { Button } from "./ui/button";

export default function Hero() {
    return(
        <section className="relative bg-[url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Moderniza tu negocio
            <strong className="block font-extrabold bg-gradient-to-r from-green-400 to-emerald-700 bg-clip-text text-transparent">
              {" "}
              ReMenu.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Con <strong>ReMenu</strong> podrás crear, organizar y actualizar el
            menú de tu restaurante y compartirlo con tus clientes mediante
            enlaces o códigos QR!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a href="/auth/login">
              <Button>Iniciar Sesión</Button>
            </a>
            <a href="/auth/register">
              <Button variant="secondary">Crear Cuenta</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
    );
}