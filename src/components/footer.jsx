import { Github, Linkedin, Mail, Utensils } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-green-500">
          <Utensils className="h-6" />
          <span>ReMenu</span>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400">
          &copy; 2024. Creado por{" "}
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">Luciano Cruz.</span>
        </p>
        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="mailto:lucianovcruz2004@gmail.com?subject=Desde ReMenu"
              target="_blank"
              className="text-green-500"
            >
              <Mail />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/lucianovcruz/"
              rel="noreferrer"
              target="_blank"
              className="text-green-500"
            >
              <Linkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/LuchoCruz08"
              rel="noreferrer"
              target="_blank"
              className="text-green-500"
            >
              <Github />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
