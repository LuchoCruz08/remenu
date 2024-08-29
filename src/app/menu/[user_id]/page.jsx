"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowUpDown, Utensils, Search } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Menu() {
  const supabase = createClient()
  const { user_id } = useParams()
  const [products, setProducts] = useState({})
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const getProducts = async () => {
    if (user_id) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user_id)

      if (error) {
        console.error("Error:", error.message)
      } else {
        const groupedProducts = data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = []
          }
          acc[product.category].push(product)
          return acc
        }, {})

        setProducts(groupedProducts)
        setCategories(["all", ...Object.keys(groupedProducts)])
      }
    } else {
      console.log("User ID is not available.")
    }
  }

  useEffect(() => {
    if (user_id) {
      getProducts()
    }
  })

  const filteredCategories =
    selectedCategory === "all" ? Object.keys(products) : [selectedCategory]

  const sortProducts = (productsToSort) => {
    return [...productsToSort].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="bg-slate-800 border-gray-700 shadow-lg animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center text-white">
              <Utensils className="mr-2 h-8 w-8 text-green-500" />
              Menú
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="w-full sm:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories
                      .filter((cat) => cat !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold mt-6 mb-4 text-green-400">{category}</h2>
                  <Table className="text-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-white">Nombre</TableHead>
                        <TableHead className="text-white">Descripción</TableHead>
                        <TableHead className="text-white">
                          <Button
                            variant="ghost"
                            onClick={toggleSortOrder}
                            className="text-sm flex items-center hover:text-green-400"
                          >
                            Precio
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterProducts(sortProducts(products[category] || [])).map((product) => (
                        <TableRow key={product.id} className="hover:bg-slate-700/50">
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      {(!products[category] || filterProducts(products[category]).length < 1) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-400">
                            No hay productos en esta categoría.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ))
            ) : (
              <p className="text-center mt-8 text-gray-400">
                Todavía no hay productos disponibles.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}