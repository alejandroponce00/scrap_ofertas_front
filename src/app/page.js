"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FlipWords from "./components/FlipWords";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const words = [{text: "StockCenter",color: "text-blue-500"},
     {text: "SoloDeportes",color: "text-red-500"},
      {text: "OpenSports",color: "text-yellow-500"}];

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

  useEffect(() => {
    // Obtener fecha de última actualización
    const fetchUltimaActualizacion = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/ultima-actualizacion`);
        const data = await res.json();
        setUltimaActualizacion(data);
      } catch (err) {
        console.error("Error obteniendo fecha de actualización:", err);
      }
    };
 
    fetchUltimaActualizacion();
  }, []);
 
  // Formatear fecha para mostrar
  const formatearFecha = (fecha) => {
    if (!fecha) return "Desconocida";
    const date = new Date(fecha);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear precio para mostrar (maneja números y strings)
  const formatearPrecio = (precio) => {
    if (!precio && precio !== 0) return 'Precio no disponible';
    
    // Si es string, limpiar y extraer el número
    if (typeof precio === 'string') {
      // Remover símbolo $ y espacios especiales, luego extraer números
      const precioLimpio = precio.replace(/[^\d.,]/g, '');
      const numero = parseFloat(precioLimpio.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(numero)) return 'Precio no disponible';
      return `$${numero.toLocaleString('es-AR')}`;
    }
    
    // Si es número, formatear directamente
    if (typeof precio === 'number') {
      return `$${precio.toLocaleString('es-AR')}`;
    }
    
    return 'Precio no disponible';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-50 flex flex-col items-center p-6">
      {/* Header con título y fecha de actualización */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-6">
          <h1 className="text-4xl font-bold">
      Ofertas Deportivas de {" "}
      <FlipWords words={words} />
    </h1>
        
        {/* Fecha de actualización en la esquina superior derecha */}
        {ultimaActualizacion && (
          <div className=" text-sm text-gray-500">
            🕐 Última actualización: {formatearFecha(ultimaActualizacion.fecha)}
          </div>
        )}
      </div>
      

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
            className="bg-white rounded-2xl hover:scale-105 shadow-md p-4  transition flex flex-col items-center"
          >
            {p.imagen && (
              <a 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Image
                  src={p.imagen}
                  width={300}
                  height={300}
                  alt={p.nombre}
                  className="w-full h-48 object-contain mb-4 rounded-xl hover:opacity-90 transition cursor-pointer"
                />
              </a>
            )}
         

            <h2 className="text-lg font-semibold text-center">{p.nombre}</h2>
            <p className="text-gray-500 mt-1">
              {formatearPrecio(p.precio)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              🏬 Origen: <span className="font-medium">{p.origen}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
