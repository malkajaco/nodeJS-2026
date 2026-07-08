# Espacio Entrega Final

Sistema de Gestion de Productos con Express y Firebase

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

## Create Product

method: POST

endpoint: /api/products

body:

```json
{
    "nombre": "Producto X",
    "precio": 100
}
```

status: 201

## Error Create Product

method: POST
endpoint: /api/products
body:

```json
{
    "nombre": "Producto X",
    "precio": 100
}
```
response:

body:

```json
{
    "error": "El campo precio es requerido."
}
```

status: 422

## Get All Products

method: GET

endpoint: /api/products

status: 200

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
        "descripcion_corta": "Set x13 Higiene Infantil",
        "stock": 0
    }
]
```

---

## Get Product By ID

method: GET

endpoint: /api/products/:id

status: 200

```json
{
    "id": "abc123",
    "codigo": "VIA-009",
    "producto": "Set x13 Higiene Infantil",
    "categoria": "ORGANIZADORES DE VIAJE",
    "proveedor": "ITEMS",
    "costo": 14990,
    "precio_unitario": 19487,
    "descripcion_corta": "Set x13 Higiene Infantil",
    "stock": 0
}
```

status: 404

```json
{
    "message": "Producto no encontrado"
}
```

---

## Seed Products

Importa masivamente los productos desde `src/productos.json` a Firestore.

method: POST

endpoint: /api/products/seed

status: 201

```json
{
    "message": "15 productos insertados correctamente"
}
```

---

## Delete Product

method: DELETE

endpoint: /api/products/:id

status: 200

```json
{
    "message": "Producto eliminado"
}
```

status: 404

```json
{
    "message": "Producto no encontrado"
}
```

## Testing

Install dependencies
```shell
npm install -D jest supertest
```

Run tests
```shell
npm test
```

package.json
```json
{
  "scripts": {
    ...
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "devDependencies": {
    "jest": "^26.6.3",
    "supertest": "^6.1.3"
  }
}
```

## Estructura del proyecto

```
├── app.js
├── index.js
├── .env
├── .env-example
├── src/
│   ├── firebase.js
│   ├── productos.json
│   ├── controllers/
│   │   ├── products.controller.js
│   │   ├── categories.controller.js
│   │   └── auth.controller.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   ├── products.router.js
│   │   ├── categories.router.js
│   │   └── auth.router.js
│   ├── services/
│   │   └── products.service.js
│   └── utils/
│       └── token.generator.js
└── __tests__/
```

---

## Modelo de datos

| Campo            | Tipo   | Descripción                     |
|------------------|--------|---------------------------------|
| codigo           | string | Código interno del producto     |
| producto         | string | Nombre del producto             |
| categoria        | string | Categoría                       |
| proveedor        | string | Nombre del proveedor            |
| costo            | number | Costo del producto              |
| precio_unitario  | number | Precio de venta                 |
| descripcion_corta| string | Descripción breve               |
| stock            | number | Stock disponible (opcional)     |
