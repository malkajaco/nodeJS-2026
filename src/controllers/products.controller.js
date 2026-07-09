import * as productsService from "../services/products.service.js";
import { MESSAGES } from "../utils/constants.js";
import { validateStockValue } from "../utils/validators.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ mensaje: MESSAGES.PRODUCTS_FETCH_ERROR });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);

    if (!product) {
      res.status(404).json({ mensaje: MESSAGES.PRODUCT_NOT_FOUND });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ mensaje: MESSAGES.PRODUCT_FETCH_ERROR });
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

    const newProduct = await productsService.createProduct({
      codigo,
      producto,
      categoria,
      proveedor,
      costo,
      precio_unitario,
      descripcion_corta,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    //Si el error tiene la marca isValidation es por datos invalidos (400)
    //Si no, es un error interno del servidor (500)
    const mensaje = error.isValidation ? error.message : MESSAGES.PRODUCT_CREATE_ERROR;
    res.status(error.isValidation ? 400 : 500).json({ mensaje });
  }
};

export const seedProducts = async (req, res) => {
  try {
    const result = await productsService.seedProducts();
    res.status(201).json({ mensaje: MESSAGES.PRODUCT_SEED_SUCCESS(result.count) });
  } catch (error) {
    res.status(500).json({ mensaje: MESSAGES.PRODUCT_SEED_ERROR });
  }
};

export const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor: value } = req.body;

    validateStockValue(value);

    const result = await productsService.updateStock(id, value);
    if (!result) {
      return res.status(404).json({ mensaje: MESSAGES.PRODUCT_NOT_FOUND });
    }

    const response = { mensaje: MESSAGES.STOCK_UPDATED, stock: result.stock };
    if (result.warning) response.advertencia = result.warning;
    res.status(200).json(response);
  } catch (error) {
    const mensaje = error.isValidation ? error.message : MESSAGES.STOCK_UPDATE_ERROR;
    res.status(error.isValidation ? 400 : 500).json({ mensaje });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ mensaje: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.status(200).json({ mensaje: MESSAGES.PRODUCT_DELETED });
  } catch (error) {
    res.status(500).json({ mensaje: MESSAGES.PRODUCT_DELETE_ERROR });
  }
};
