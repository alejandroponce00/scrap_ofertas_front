# DeporteScan 👟 - Frontend de Ofertas Deportivas

Aplicación web frontend desarrollada con Next.js que muestra ofertas de productos deportivos desde múltiples tiendas, conectada a un backend Node.js con base de datos en Firebase Firestore.

## 🚀 Características Principales

- **Scraping Automatizado**: Obtiene productos de tiendas deportivas (Stock Center, Solo Deportes)
- **Búsqueda en Tiempo Real**: Filtrado de productos por nombre
- **Imágenes Optimizadas**: Muestra imágenes de productos con lazy loading
- **Navegación Directa**: Click en imágenes para visitar el producto original
- **Timestamp de Actualización**: Muestra cuándo se actualizó la base de datos
- **Diseño Responsivo**: Interfaz moderna con Tailwind CSS

## 🏗️ Arquitectura

### Frontend (Next.js)
- **Framework**: Next.js 15 con React
- **Estilos**: Tailwind CSS
- **Optimización**: Next.js Image component para imágenes externas
- **Estado**: React hooks (useState, useEffect)

### Backend (Node.js)
- **Runtime**: Node.js con ES modules
- **Web Scraping**: Puppeteer para extracción de datos
- **API REST**: Express.js con CORS
- **Base de Datos**: Firebase Firestore

### Base de Datos (Firebase)
- **Colección**: `productos` - almacena todos los productos
- **Colección**: `metadata` - almacena timestamps de actualización
- **Estructura**: Cada producto contiene nombre, precio, imagen, URL, origen y fecha

## 📦 Estructura del Proyecto

```
front_scrapiofertas/
├── src/
│   └── app/
│       └── page.js          # Componente principal
├── public/                  # Archivos estáticos
├── .env                    # Variables de entorno
├── next.config.mjs         # Configuración de Next.js
└── package.json            # Dependencias
```


### Dominios de Imágenes Permitidos
```javascript
// next.config.mjs
images: {
  domains: [
    'stockcenter.com.ar',
    'www.stockcenter.com.ar',
    'solodeportes.com.ar',
    'www-cdn.solodeportes.com.ar'
  ]
}
```

## 🌐 API Endpoints

| Endpoint | Método | Descripción |
|----------|---------|-------------|
| `/productos` | GET | Obtiene todos los productos |
| `/productos/buscar?q=` | GET | Busca productos por nombre |
| `/ultima-actualizacion` | GET | Obtiene fecha de última actualización |

## 🛒 Tiendas Soportadas

- **Stock Center**: Scraping de ofertas deportivas
- **Solo Deportes**: Productos con descuentos
- **Extensible**: Fácil agregar nuevas fuentes

## 💾 Flujo de Datos

1. **Backend**: Ejecuta scraping periódico con Puppeteer
2. **Firebase**: Almacena productos con timestamps
3. **Frontend**: Consume API REST para mostrar datos
4. **Usuario**: Interactúa con búsqueda y navegación

## 🎯 Funcionalidades Detalladas

### Búsqueda
- Filtrado en tiempo real mientras escribe
- Búsqueda insensible a mayúsculas/minúsculas
- Actualización automática de resultados

### Productos
- Grid responsivo (1 columna móvil, 3 desktop)
- Imágenes clickeables que abren el producto original
- Precios formateados en pesos argentinos
- Indicador de tienda origen

### Actualización
- Timestamp automático del último scraping
- Formato localizado (dd/mm/yyyy HH:MM)
- Manejo de errores si no hay datos

## 🚀 Getting Started

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Backend corriendo en puerto 4000

### Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd front_scrapiofertas

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con NEXT_PUBLIC_API_URL

# Iniciar desarrollo
npm run dev
```

### Acceso
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Tecnologías

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express, Puppeteer
- **Base de Datos**: Firebase Firestore
- **Despliegue**: Vercel (frontend), Railway/Heroku (backend)

## 📈 Mejoras Futuras

- [ ] Paginación de resultados
- [ ] Filtros por precio y tienda
- [ ] Sistema de favoritos
- [ ] Notificaciones de nuevas ofertas
- [ ] Dashboard de estadísticas

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles.

---

**DeporteScan** - Tu buscador de ofertas deportivas 🏃‍♂️💨