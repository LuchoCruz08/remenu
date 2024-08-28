"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent animate-pulse">
            Precios claros y simples
          </h2>
          <p className="text-gray-300 text-lg">
            Los precios están en ARS (Pesos Argentinos)
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span
            className={`text-lg transition-colors duration-300 ${
              !isAnnual ? "text-green-500 font-bold" : "text-gray-300"
            }`}
          >
            Mensual
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="bg-gray-700 data-[state=checked]:bg-green-500"
          />
          <span
            className={`text-lg transition-colors duration-300 ${
              isAnnual ? "text-green-500 font-bold" : "text-gray-300"
            }`}
          >
            Anual
          </span>
        </div>

        <Card className="bg-slate-800 border-gray-700 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-6xl font-bold mb-2 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              ${isAnnual ? annualPrice : monthlyPrice}
              <span className="text-2xl text-gray-400">
                /{isAnnual ? "año" : "mes"}
              </span>
            </CardTitle>
            <p className="text-gray-400 text-lg mb-4">
              {isAnnual
                ? `$${Math.round(annualPrice / 12)}/mes facturado anualmente`
                : "$54000/año facturado mensualmente"}
            </p>
            {isAnnual && (
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white text-sm px-3 py-1 inline-flex items-center"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {discountPercentage}% de descuento
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-8">
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-lg group">
                  <Check className="h-6 w-6 text-green-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 text-xl rounded-lg transition duration-300 transform hover:scale-105">
              Elegir plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
