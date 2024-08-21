import { ChartSpline, ChefHat, UserRound } from "lucide-react";

export default function Benefits() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 class="text-3xl font-bold sm:text-4xl">Beneficios</h2>
          <p className="mt-4 text-gray-300">
            Usar ReMenu tiene los siguientes beneficios
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a className="block rounded-xl border border-gray-700 p-8 shadow-xl transition hover:border-green-500/10 hover:shadow-green-500/10">
            <ChefHat className="size-10 text-green-500" />
            <h2 className="mt-4 text-xl font-bold text-white">
              Gestión eficiente del menú
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Agilice la gestión del menú de su restaurante creando,
              actualizando y organizando los artículos en un único panel de
              control fácil de usar. Ahorre tiempo y reduzca los errores
              gestionando todos los cambios del menú de forma digital.
            </p>
          </a>

          <a className="block rounded-xl border border-gray-700 p-8 shadow-xl transition hover:border-green-500/10 hover:shadow-green-500/10">
            <UserRound className="size-10 text-green-500" />
            <h2 className="mt-4 text-xl font-bold text-white">
              Mejor experiencia del cliente
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Mejore la satisfacción del cliente brindándole acceso instantáneo
              a su menú a través de códigos QR y enlaces. Los clientes pueden
              ver y explorar fácilmente su menú en sus dispositivos, lo que
              garantiza una experiencia fluida.
            </p>
          </a>

          <a className="block rounded-xl border border-gray-700 p-8 shadow-xl transition hover:border-green-500/10 hover:shadow-green-500/10">
            <ChartSpline className="size-10 text-green-500" />
            <h2 className="mt-4 text-xl font-bold text-white">
              Rentable y Flexible
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Reduzca los costos de impresión y elimine la necesidad de
              reimprimir menús con frecuencia. Con los menús digitales, puede
              actualizar precios, agregar nuevos platos o lanzar promociones de
              manera rápida y sencilla sin gastos adicionales.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
