import { ChartSpline, ChefHat, UserRound } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Benefits() {
  const benefits = [
    {
      icon: ChefHat,
      title: "Gestión eficiente del menú",
      description: "Agilice la gestión del menú de su restaurante creando, actualizando y organizando los artículos en un único panel de control fácil de usar. Ahorre tiempo y reduzca los errores gestionando todos los cambios del menú de forma digital.",
      badge: "Eficiencia"
    },
    {
      icon: UserRound,
      title: "Mejor experiencia del cliente",
      description: "Mejore la satisfacción del cliente brindándole acceso instantáneo a su menú a través de códigos QR y enlaces. Los clientes pueden ver y explorar fácilmente su menú en sus dispositivos, lo que garantiza una experiencia fluida.",
      badge: "Satisfacción"
    },
    {
      icon: ChartSpline,
      title: "Rentable y Flexible",
      description: "Reduzca los costos de impresión y elimine la necesidad de reimprimir menús con frecuencia. Con los menús digitales, puede actualizar precios, agregar nuevos platos o lanzar promociones de manera rápida y sencilla sin gastos adicionales.",
      badge: "Ahorro"
    }
  ]

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Usar ReMenu tiene los siguientes beneficios
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-slate-800 border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
              <CardHeader>
                <benefit.icon className="size-12 text-green-500 mb-4" />
                <CardTitle className="text-2xl font-bold text-white">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  {benefit.description}
                </CardDescription>
                <Badge variant="secondary" className="mt-4 bg-green-500/10 text-green-400 hover:bg-green-500/20">
                  {benefit.badge}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}