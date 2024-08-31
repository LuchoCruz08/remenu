"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Utensils, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      if (!product.name) {
        toast.error("El nombre del producto es obligatorio");
        setSubmitting(false);
        return;
      }

      const productWithDefaultPrice = {
        ...product,
        price: product.price ? parseFloat(product.price) : 0,
      };

      const { error } = await supabase
        .from("products")
        .insert([productWithDefaultPrice]);
      if (error) throw error;

      toast.success("Producto agregado exitosamente");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      console.log(error.message);
      toast.error("Error al agregar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-slate-800 border-gray-700 shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-white">
            <Utensils className="mr-2 h-6 w-6 text-green-500" />
            Agregar Nuevo Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nombre del producto (OBLIGATORIO)
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={onChange}
                placeholder="Pizza Especial, Hamburguesa Completa, etc."
                className="bg-slate-700 border-gray-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Descripción del producto
              </Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={onChange}
                placeholder="Ingredientes, porciones, etc."
                className="bg-slate-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Categoría del producto
              </Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={onChange}
                placeholder="Pizzas, Lomos, Bebidas, etc."
                className="bg-slate-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">
                Precio del producto
              </Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={onChange}
                placeholder="0.00"
                className="bg-slate-700 border-gray-600 text-white"
              />
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handleCreate}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              {submitting ? "Agregando..." : "Agregar Producto"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  );
}
