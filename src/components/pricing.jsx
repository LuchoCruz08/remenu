"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 4500;
  const annualPrice = Math.round(monthlyPrice * 12 * 0.85);
  const discountPercentage = 15;

  const features = [
    "Creación de menús digitales",
    "Gestión de productos",
    "Generación de enlaces y códigos QR",
    "Personalización de menús",
  ];

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Precios claros y simples</h2>
          <p className="text-gray-300">
            Los precios están en ARS (Pesos Argentinos)
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <span
            className={`text-sm ${
              !isAnnual ? "text-green-500 font-bold" : "text-gray-300"
            }`}
          >
            Mensual
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="bg-gray-700"
          />
          <span
            className={`text-sm ${
              isAnnual ? "text-green-500 font-bold" : "text-gray-300"
            }`}
          >
            Anual
          </span>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 shadow-xl border border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-5xl font-bold mb-2">
              ${isAnnual ? annualPrice : monthlyPrice}
              <span className="text-xl text-gray-400">
                /{isAnnual ? "año" : "mes"}
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
              {isAnnual
                ? `$${Math.round(annualPrice / 12)}/mes facturado anualmente`
                : "$54000/año facturado mensualmente"}
            </p>
            {isAnnual && (
              <div className="mt-2 inline-flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                {discountPercentage}% de descuento
              </div>
            )}
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300">
            Comenzar prueba gratuita de 7 días
          </Button>
        </div>
      </div>
    </section>
  );
}
