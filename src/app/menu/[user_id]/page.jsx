"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Menu() {
  const supabase = createClient();
  const { user_id } = useParams();
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const getProducts = async () => {
    if (user_id) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        console.error("Error:", error.message);
      } else {
        const groupedProducts = data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});

        setProducts(groupedProducts);
        setCategories(["all", ...Object.keys(groupedProducts)]);
      }
    } else {
      console.log("User ID is not available.");
    }
  };

  useEffect(() => {
    if (user_id) {
      getProducts();
    }
  });

  const filteredCategories =
    selectedCategory === "all" ? Object.keys(products) : [selectedCategory];

  const sortProducts = (productsToSort) => {
    return [...productsToSort].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen flex flex-col">
      <div className="container mx-auto mt-8 max-w-[960px] px-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Menu</h1>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "secondary"}
            onClick={() => setSelectedCategory("all")}
            className="text-sm"
          >
            Todas las categorías
          </Button>
          {categories
            .filter((cat) => cat !== "all")
            .map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "default" : "secondary"
                }
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
                {category}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Nombre
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Descripción
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        <Button
                          variant="ghost"
                          onClick={toggleSortOrder}
                          className="text-sm flex items-center"
                        >
                          Precio
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortProducts(products[category] || []).map((product) => (
                      <tr key={product.id} className="hover:bg-gray-700">
                        <td className="py-2 px-4 border-b border-gray-700">
                          {product.name}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-700">
                          {product.description}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-700">
                          ${product.price}
                        </td>
                      </tr>
                    ))}
                    {(!products[category] || products[category].length < 1) && (
                      <tr>
                        <td colSpan={3} className="py-2 px-4 text-center">
                          No hay productos en esta categoría.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-8">
            Todavía no hay productos disponibles.
          </p>
        )}
      </div>
    </section>
  );
}
