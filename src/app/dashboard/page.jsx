"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Eye, Trash2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import DashboardHeader from "@/components/Dashboard/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  });

  const getProducts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error:", error.message);
    } else {
      setProducts(data);
    }
  };

  const handleDelete = async (productId, productTitle) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting product:", error.message);
    } else {
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.id !== productId)
      );
    }
  };

  useEffect(() => {
    if (user) {
      getProducts();
    }
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto mt-8 max-w-[960px] px-4 flex-grow">
        <Card className="bg-slate-800 border-gray-700 shadow-lg animate-fade-in-up text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Productos</CardTitle>
            <Link href="/dashboard/crear">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Agregar producto
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Nombre</TableHead>
                    <TableHead className="text-white">Descripción</TableHead>
                    <TableHead className="text-white">Categoría</TableHead>
                    <TableHead className="text-white">Precio</TableHead>
                    <TableHead className="text-white">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product.id}
                      className="hover:bg-slate-700/50"
                    >
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/dashboard/ver/${product.id}`}>
                            <Button variant="secondary" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver/Editar
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-800 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Estás seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-400">
                                  Esta acción no se puede deshacer. Esto
                                  eliminará permanentemente el producto{" "}
                                  {product.name}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() =>
                                    handleDelete(product.id, product.name)
                                  }
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
                        <p className="text-slate-400 mt-2">
                          Todavía no agregaste ningún producto.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </section>
  );
}