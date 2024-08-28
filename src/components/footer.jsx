import { Github, Linkedin, Mail, Utensils } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-700 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-green-500 mb-8 transform hover:scale-110 transition-transform duration-300">
            <Utensils className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">ReMenu</span>
          </div>

          <p className="max-w-md text-center leading-relaxed text-gray-400 mb-8">
            Simplifica la gestión de tu menú y mejora la experiencia de tus
            clientes con ReMenu.
          </p>

          <div className="text-center mb-8">
            <p className="text-gray-400">
              &copy; 2024. Creado por{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-semibold">
                Luciano Cruz
              </span>
            </p>
          </div>

          <ul className="flex justify-center gap-6 mb-8">
            <li>
              <a
                href="mailto:lucianovcruz2004@gmail.com?subject=Desde ReMenu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucianovcruz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/LuchoCruz08"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
