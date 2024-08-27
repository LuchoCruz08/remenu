"use client";

import DashboardHeader from "@/components/Dashboard/header";
import Footer from "@/components/footer";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/auth/login");
      }
    };

    getUser();
  });

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error:", error.message);
    } else {
      setProducts(data);
    }
  };

  const handleDelete = async (productId, productTitle) => {
    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el producto "${productTitle}"?`
    );
    if (confirmDelete) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.error("Error deleting product:", error.message);
      } else {
        setProducts((prevProduct) =>
          prevProduct.filter((product) => product.id !== productId)
        );
      }
    }
  };

  useEffect(() => {
    getProducts();
  });

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto mt-8 max-w-[960px] px-4">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-700 mb-4">
          <h1 className="text-3xl font-semibold">Productos</h1>
          <Link
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/dashboard/crear"
          >
            Agregar producto
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Nombre</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Descripción
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Categoría
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Precio</th>
                <th className="py-2 px-4 border-b border-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-700">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {product.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <div className="flex gap-4">
                      <Link
                        className="text-green-500 underline hover:no-underline"
                        href={`/dashboard/ver/${product.id}`}
                      >
                        Ver/Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-500 underline hover:no-underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products?.length < 1 && (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">
                    Todavía no agregaste ningun producto.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="border-t-2 border-green-700" />
      <Footer />
    </section>
  );
}
