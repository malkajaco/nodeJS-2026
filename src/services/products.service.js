import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllProducts as fetchAllProducts,
  getProductById as fetchProductById,
  addProductToDb as fetchAddProduct,
  deleteProductFromDb as fetchDeleteProduct,
  seedProductsFromJson as fetchSeedProducts,
} from "../models/Product.js";

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
  const newProduct = {
    codigo: productData.codigo,
    producto: productData.producto,
    categoria: productData.categoria,
    proveedor: productData.proveedor,
    costo: productData.costo,
    precio_unitario: productData.precio_unitario,
    descripcion_corta: productData.descripcion_corta,
  };
  return await fetchAddProduct(newProduct);
};

export const deleteProduct = async (id) => {
  return await fetchDeleteProduct(id);
};

export const seedProducts = async () => {
  const productsPath = join(__dirname, "../../productos.json");
  const products = JSON.parse(readFileSync(productsPath, "utf-8"));
  const count = await fetchSeedProducts(products);
  return { count };
};
