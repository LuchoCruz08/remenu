"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import QRCode from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Link as LinkIcon, Download, Copy } from "lucide-react"

export default function Generate() {
  const supabase = createClient()
  const [userId, setUserId] = useState(null)
  const [link, setLink] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()

  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error("Error fetching user:", error.message)
      router.push("/auth/login")
    } else {
      const user = data?.user
      if (user) {
        setUserId(user.id)
        setLink(`${window.location.origin}/menu/${user.id}`)
      } else {
        router.push("/auth/login")
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getUserId()
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code')
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "qr-code.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-slate-800 border-gray-700 shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-white">
            <LinkIcon className="mr-2 h-6 w-6 text-green-500" />
            Enlace y Código QR
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            </div>
          ) : userId ? (
            <>
              <div className="mb-6 space-y-2">
                <label htmlFor="link" className="text-sm font-medium text-gray-300">
                  Enlace a tu menú:
                </label>
                <div className="flex">
                  <Input
                    id="link"
                    value={link}
                    readOnly
                    className="flex-grow bg-slate-700 border-gray-600 text-white"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="ml-2 bg-green-500 hover:bg-green-600"
                  >
                    {isCopied ? "¡Copiado!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <p className="text-sm font-medium text-gray-300">Código QR:</p>
                <div className="flex justify-center bg-white p-4 rounded-lg">
                  <QRCode id="qr-code" value={link} size={200} level="H" />
                </div>
              </div>

              <Button onClick={downloadQR} className="w-full bg-green-500 hover:bg-green-600">
                <Download className="mr-2 h-4 w-4" /> Descargar Código QR
              </Button>
            </>
          ) : (
            <p className="text-center text-gray-300">No se pudo cargar la información. Por favor, inicia sesión.</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}