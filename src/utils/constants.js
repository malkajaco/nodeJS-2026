export const MESSAGES = {
  WELCOME: "Bienvenido a la API de productos",
  ROUTE_NOT_FOUND: "Ruta no encontrada",
  SERVER_RUNNING: (port) => `Servidor corriendo en el puerto ${port}`,

  PRODUCT_NOT_FOUND: "Producto no encontrado",
  PRODUCTS_FETCH_ERROR: "Error al obtener los productos",
  PRODUCT_FETCH_ERROR: "Error al obtener el producto",
  PRODUCT_CREATE_ERROR: "Error al crear el producto",
  PRODUCT_SEED_SUCCESS: (count) => `${count} productos insertados correctamente`,
  PRODUCT_SEED_ERROR: "Error al insertar los productos",
  PRODUCT_DELETED: "Producto eliminado",
  PRODUCT_DELETE_ERROR: "Error al eliminar el producto",

  STOCK_UPDATED: "Stock actualizado",
  STOCK_UPDATE_ERROR: "Error al actualizar el stock",
  STOCK_WARNING: "El producto no tiene stock luego de este cambio",

  AUTH_MISSING_CREDENTIALS: "Faltan credenciales",
  AUTH_LOGIN_SUCCESS: "Login exitoso",
  AUTH_INVALID_CREDENTIALS: "Credenciales inválidas",
  AUTH_TOKEN_NOT_SENT: "Token no enviado",
  AUTH_INVALID_TOKEN_FORMAT: "Formato de token invalido",
  AUTH_INVALID_OR_EXPIRED_TOKEN: "Token invalido o expirado",

  VALIDATION_MISSING_FIELD: (field) => `Falta el campo obligatorio: ${field}`,
  VALIDATION_INVALID_CODE: "El código debe tener el formato XXX-999 (3 letras, guion, 3 dígitos)",
  VALIDATION_INVALID_COSTO: "El campo 'costo' debe ser un número positivo con hasta 2 decimales",
  VALIDATION_INVALID_PRECIO: "El campo 'precio_unitario' debe ser un número positivo con hasta 2 decimales",
  VALIDATION_INVALID_STOCK_VALUE: "El campo 'valor' es requerido y debe ser un número",
};
