# Espacio Entrega Final CURSO NODE-JS
Autor: Malka Jacobo (Amaranta Kohn)
LinkedIN: https://www.linkedin.com/in/malka-jacobo/
Repo: https://github.com/malkajaco/nodeJS-2026
Deploy: https://node-js-2026-fdu2.vercel.app


Sistema de Gestion de Productos con Express y Firebase

> **Para pruebas rápidas:** Ejecuta `POST /api/products/seed` (requiere auth) para cargar los productos de `productos.json` en Firestore.  
> **Usuario de prueba:** `user@email.com` / `strongPass123`

## Instalacion

1. Clonar el repositorio
2. Instalar las dependencias
```shell
npm install
```

## Ejecutar el proyecto
```shell
npm run dev
```

## Configuracion

Ver el archivo `.env-example` en la raiz del proyecto.

---

## API Map

### Autenticación

```
POST /api/auth/login
```

Autentica al usuario y devuelve un token JWT.

**Body:**
```json
{
    "email": "user@email.com",
    "password": "strongPass123"
}
```

**Respuesta 201:**
```json
{
    "mensaje": "Login exitoso",
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Respuesta 401:**
```json
{
    "mensaje": "Credenciales inválidas"
}
```

> Todas las rutas marcadas con 🔒 requieren el header `Authorization: Bearer <token>`

---

### Productos

```
GET /api/products
```

Lista todos los productos.

**Respuesta 200:**
```json
[
    {
        "id": "abc123",
        "codigo": "VIA-009",
        "producto": "Set x13 Higiene Infantil",
        "categoria": "ORGANIZADORES DE VIAJE",
        "proveedor": "ITEMS",
        "costo": 14990,
        "precio_unitario": 19487,
        "descripcion_corta": "Set x13 Higiene Infantil\nColor rosa y Celeste",
        "stock": 0
    }
]
```

---

```
GET /api/products/:id
```

Obtiene un producto por su ID.

**Respuesta 200:** igual que arriba, un solo objeto.

**Respuesta 404:**
```json
{
    "mensaje": "Producto no encontrado"
}
```

---

```
POST /api/products  🔒
```

Crea un nuevo producto.

**Body:**
```json
{
    "codigo": "PRO-001",
    "producto": "Nombre del producto",
    "categoria": "Categoría",
    "proveedor": "Proveedor",
    "costo": 1000,
    "precio_unitario": 1500,
    "descripcion_corta": "Descripción breve"
}
```

**Validaciones:**
- `codigo`: obligatorio, formato `XXX-999` (3 letras, guion, 3 dígitos)
- `producto`, `categoria`, `proveedor`, `costo`, `precio_unitario`: obligatorios

**Respuesta 201:** devuelve el producto creado con su ID de Firestore.

**Respuesta 400:**
```json
{
    "mensaje": "Falta el campo obligatorio: producto"
}
```

---

```
PATCH /api/products/:id/stock  🔒
```

Modifica el stock de un producto. El valor se suma (positivo) o resta (negativo).

**Body:**
```json
{
    "valor": 5
}
```

**Respuesta 200:**
```json
{
    "mensaje": "Stock actualizado",
    "stock": 10
}
```

Si el stock resultante es menor a 1, incluye una advertencia:
```json
{
    "mensaje": "Stock actualizado",
    "stock": 0,
    "advertencia": "El producto no tiene stock luego de este cambio"
}
```

---

```
POST /api/products/seed  🔒
```

Carga masiva de productos desde `productos.json` a Firestore.

**Respuesta 201:**
```json
{
    "mensaje": "14 productos insertados correctamente"
}
```

---

```
DELETE /api/products/:id  🔒
```

Elimina un producto por su ID.

**Respuesta 200:**
```json
{
    "mensaje": "Producto eliminado"
}
```

**Respuesta 404:**
```json
{
    "mensaje": "Producto no encontrado"
}
```

---

## Testing

```shell
npm test
```

---

## Estructura del proyecto

```
├── index.js                  ← Punto de entrada: levanta el servidor
├── app.js                    ← Configura Express, CORS y rutas
├── .env                      ← Variables de entorno
├── .env-example              ← Plantilla de variables de entorno
├── productos.json            ← Datos de prueba para el seed
├── src/
│   ├── cors.js               ← Configuración de CORS
│   ├── config/
│   │   └── firebase.js       ← Conexión a Firestore
│   ├── controllers/
│   │   ├── products.controller.js  ← Maneja req/res de productos
│   │   └── auth.controller.js      ← Maneja req/res de autenticación
│   ├── models/
│   │   └── Product.js        ← Operaciones con Firestore (CRUD)
│   ├── routes/
│   │   ├── products.router.js  ← Define rutas de productos
│   │   └── auth.router.js      ← Define rutas de autenticación
│   ├── services/
│   │   └── products.service.js ← Lógica de negocio de productos
│   ├── middlewares/
│   │   └── auth.middleware.js  ← Middleware de autenticación JWT
│   └── utils/
│       ├── constants.js       ← Mensajes y textos de la aplicación
│       ├── validators.js      ← Validaciones de datos
│       └── token.generator.js ← Generación de tokens JWT
└── __tests__/
    ├── app.test.js
    ├── auth.test.js
    └── products.test.js
```

---

## Modelo de datos (Producto)

| Campo            | Tipo   | Descripción                     |
|------------------|--------|---------------------------------|
| codigo           | string | Código interno (XXX-999)        |
| producto         | string | Nombre del producto             |
| categoria        | string | Categoría                       |
| proveedor        | string | Nombre del proveedor            |
| costo            | number | Costo del producto              |
| precio_unitario  | number | Precio de venta                 |
| descripcion_corta| string | Descripción breve               |
| stock            | number | Stock disponible (opcional)     |

// TODO: Agregar CRUD de categorías y validar que la categoría exista al crear un producto
