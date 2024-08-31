"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Utensils, Edit2, Save, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function View() {
  const supabase = createClient()
  const router = useRouter()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [updatedValue, setUpdatedValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error:", error.message)
        toast.error("Error al cargar el producto")
      } else {
        setProduct(data)
      }
    }

    fetchProduct()
  })

  const handleEdit = (field) => {
    setEditingField(field)
    setUpdatedValue(product[field])
  }

  const handleUpdate = async (field) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("products")
        .update({ [field]: updatedValue })
        .eq("id", id)

      if (error) throw error

      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) {
        console.error("Error:", fetchError.message)
        toast.error("Error al actualizar el producto")
      } else {
        setProduct(data)
        setEditingField(null)
        setUpdatedValue("")
        toast.success("Producto actualizado exitosamente")
      }
    } catch (error) {
      console.error("Error updating:", error.message)
      toast.error("Error al actualizar el producto")
    } finally {
      setIsLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-gray-700 shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-white">
            <Utensils className="mr-2 h-6 w-6 text-green-500" />
            Detalles del Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            {[
              { label: "Nombre", field: "name" },
              { label: "Descripción", field: "description" },
              { label: "Categoría", field: "category" },
              { label: "Precio", field: "price" },
            ].map(({ label, field }) => (
              <div key={field} className="flex flex-col space-y-1">
                <dt className="text-sm font-medium text-gray-400">{label}</dt>
                <dd className="text-lg text-white">
                  {editingField === field ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type={field === "price" ? "number" : "text"}
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                        className="flex-grow bg-slate-700 border-gray-600 text-white"
                      />
                      <Button
                        onClick={() => handleUpdate(field)}
                        disabled={isLoading}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{product[field]}</span>
                      <Button
                        onClick={() => handleEdit(field)}
                        variant="ghost"
                        className="text-green-400 hover:text-green-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <Button className="bg-slate-700 hover:bg-slate-600 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  )
}