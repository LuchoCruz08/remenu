"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";

export default function Generate() {
  const supabase = createClient();
  const [userId, setUserId] = useState(null);
  const [link, setLink] = useState("");
  const router = useRouter();

  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error.message);
    } else {
      const user = data?.user;
      if (user) {
        setUserId(user.id);
        setLink(`/menu/${user.id}`);
      } else {
        router.push("/auth/login");
      }
    }
  };

  useEffect(() => {
    getUserId();
  });

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white min-h-screen flex flex-col">
      <div className="container mx-auto mt-8 max-w-[960px] px-4">
        <h1 className="text-3xl font-semibold mb-4">Enlace y Código QR</h1>

        {userId && (
          <>
            <div className="mb-4">
              <p className="text-lg font-medium">Enlace:</p>
              <a href={link} className="text-blue-500 hover:underline">
                {link}
              </a>
            </div>

            <div className="mb-4">
              <p className="text-lg font-medium">Código QR:</p>
              <QRCode value={link} size={256} />
            </div>
          </>
        )}

        {!userId && <p className="text-center mt-8">Loading...</p>}
      </div>
    </section>
  );
}
