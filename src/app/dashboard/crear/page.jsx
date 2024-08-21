"use client";

import { createClient } from "@/utils/supabase/client";
import { LoaderCircle, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Create() {
  const supabase = createClient();
  const router = useRouter();
  const [product, setProduct] = useState({
    user_id: "",
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        router.push("/auth/login");
      } else {
        setProduct((prev) => ({ ...prev, user_id: data.user.id }));
        setLoading(false);
      }
    };

    fetchUser();
  });

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const productWithDefaultPrice = {
        ...product,
        price: product.price ? parseFloat(product.price) : 0,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([productWithDefaultPrice]);
      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div
        role="status"
        className="flex items-center justify-center min-h-screen"
      >
        <LoaderCircle className="w-8 h-8 text-greem-600 animate-spin" />
      </div>
    );

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <a
          href="/dashboard"
          className="flex items-center mb-6 text-2xl font-semibold text-green-500"
        >
          <Utensils />
          ReMenu
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-slate-900 to-slate-700 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Agrega un nuevo producto
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  <strong>Nombre del producto (OBLIGATORIO):</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Pizza Especial, Hamburguesa Completa, etc."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Descripción del producto:
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={product.description}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingredientes, porciones,etc."
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Categoría del producto:
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Pizzas, Lomos, Bebidas, etc."
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Precio del producto:
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
                type="button"
                onClick={handleCreate}
              >
                Agregar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
