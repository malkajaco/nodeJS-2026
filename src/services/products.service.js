import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllProducts as fetchAllProducts,
  getProductById as fetchProductById,
  addProductToDb as fetchAddProduct,
  deleteProductFromDb as fetchDeleteProduct,
  seedProductsFromJson as fetchSeedProducts,
  updateProductStock as fetchUpdateProductStock,
} from "../models/Product.js";
import { validateProduct } from "../utils/validators.js";
import { MESSAGES } from "../utils/constants.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllProducts = async () => {
  return await fetchAllProducts();
};

export const getProductById = async (id) => {
  const product = await fetchProductById(id);
  if (!product) {
    return null;
  }
  return product;
};

export const createProduct = async (productData) => {
  validateProduct(productData);
  const newProduct = {
    codigo: productData.codigo,
    producto: productData.producto,
    categoria: productData.categoria,
    proveedor: productData.proveedor,
    costo: productData.costo,
    precio_unitario: productData.precio_unitario,
    descripcion_corta: productData.descripcion_corta,
    stock: productData.stock ?? 0,
  };
  return await fetchAddProduct(newProduct);
};

export const deleteProduct = async (id) => {
  return await fetchDeleteProduct(id);
};

//Modifica el stock de un producto sumando o restando segun el valor recibido
//Si el stock resultante es menor a 1, incluye una advertencia en la respuesta
export const updateStock = async (id, value) => {
  const product = await fetchProductById(id);
  if (!product) return null;

  const currentStock = product.stock ?? 0;
  const newStock = currentStock + value;
  const warning = newStock < 1 ? MESSAGES.STOCK_WARNING : undefined;

  const updated = await fetchUpdateProductStock(id, newStock);
  return { ...updated, warning };
};

//Lee el archivo productos.json y carga todos los productos en Firestore para una carga rapida inicial.
//Usa un batch para enviar todo junto. Devuelve la cantidad de productos insertados
export const seedProducts = async () => {
  const productsPath = join(__dirname, "../../productos.json");
  const products = JSON.parse(readFileSync(productsPath, "utf-8"));
  const count = await fetchSeedProducts(products);
  return { count };
};
