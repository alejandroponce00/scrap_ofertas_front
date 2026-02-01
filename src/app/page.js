"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError("");
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = busqueda
          ? `${baseUrl}/productos/buscar?q=${busqueda}`
          : `${baseUrl}/productos`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [busqueda]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        🛒 ScrapyOfertas - Ofertas de Productos deportivos
      </h1>
      

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 border rounded-xl shadow-sm focus:ring focus:ring-black"
      />

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {productos.map((p) => (
          <div
            key={p.id || p.nombre} // si no tienes id, usa el nombre como fallback
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col items-center"
          >
            {p.imagen && (
              <Image
                src={p.imagen}
                width={300}
                height={300}
                alt={p.nombre}
                className="w-full h-48 object-contain mb-4 rounded-xl"
              />
            )}
         

            <h2 className="text-lg font-semibold text-center">{p.nombre}</h2>
            <p className="text-gray-500 mt-1">{p.precio}</p>
            <p className="text-sm text-gray-400 mt-1">
              🏬 Origen: <span className="font-medium">{p.origen}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
