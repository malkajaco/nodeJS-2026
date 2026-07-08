import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productsService.getProductById(id);

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      codigo,
      producto,
      categoria,
      proveedor,
      costo,
      precio_unitario,
      descripcion_corta,
    } = req.body;

    const newProduct = productsService.createProduct({
      codigo,
      producto,
      categoria,
      proveedor,
      costo,
      precio_unitario,
      descripcion_corta,
    });
    if (!producto || !proveedor || !costo || !precio_unitario) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const seedProducts = async (req, res) => {
  try {
    const result = await productsService.seedProducts();
    res.status(201).json({ message: `${result.count} productos insertados correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar los productos" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
