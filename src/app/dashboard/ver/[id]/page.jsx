"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle, Utensils } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function View() {
  const supabase = createClient();
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error:", error.message);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id, supabase]);

  const handleEdit = (field) => {
    setEditingField(field);
    setUpdatedValue(product[field]);
  };

  const handleUpdate = async (field) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("products")
        .update({ [field]: updatedValue })
        .eq("id", id);

      if (error) throw error;

      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error:", fetchError.message);
      } else {
        setProduct(data);
        setEditingField(null);
        setUpdatedValue("");
      }
    } catch (error) {
      console.error("Error updating:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product)
    return (
      <div
        role="status"
        className="flex items-center justify-center min-h-screen"
      >
        <LoaderCircle className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <a
          href="/dashboard"
          className="flex items-center mb-6 text-2xl font-semibold text-green-500"
        >
          <Utensils />
          ReMenu
        </a>
        <div className="max-w-4xl w-full px-4 py-6 bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg border border-gray-700 shadow-lg">
          <dl className="-my-3 divide-y divide-gray-700 text-sm">
            {[
              { label: "Nombre", field: "name" },
              { label: "Descripción", field: "description" },
              { label: "Categoría", field: "category" },
              { label: "Precio", field: "price" },
            ].map(({ label, field }) => (
              <div
                key={field}
                className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
              >
                <dt className="font-medium text-white">{label}</dt>
                <dd className="text-gray-200 sm:col-span-2">
                  {editingField === field ? (
                    <div className="flex items-center gap-2">
                      <input
                        type={field === "price" ? "number" : "text"}
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                        className="border rounded-lg p-2 bg-gray-900 text-white"
                      />
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                        onClick={() => handleUpdate(field)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoaderCircle className="w-5 h-5 animate-spin" />
                        ) : (
                          "Guardar"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {product[field]}
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                        onClick={() => handleEdit(field)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 text-center">
            <Link href="/dashboard">
              <Button>Volver al Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
