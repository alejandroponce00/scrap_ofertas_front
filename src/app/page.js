"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = busqueda
        ? `${baseUrl}/productos/buscar?q=${busqueda}`
        : `${baseUrl}/productos`;
      const res = await fetch(url);
      const data = await res.json();
      setProductos(data);
    };
    fetchProductos();
  }, [busqueda]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Buscar productos</h1>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 border rounded-xl shadow-sm focus:ring focus:ring-black"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {productos.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{p.nombre}</h2>
            <p className="text-gray-500">{p.precio}</p>
            <p className="text-sm text-gray-400 mt-1">
              🏬 Origen: <span className="font-medium">{p.origen}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
