import { MESSAGES } from "./constants.js";

const codeRegex = /^[A-Za-z]{3}-\d{3}$/;

const requiredFields = ["codigo", "producto", "categoria", "proveedor", "costo", "precio_unitario"];

const createValidationError = (message) => {
  const error = new Error(message);
  error.isValidation = true;
  return error;
};

export const validateProduct = (data) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      throw createValidationError(MESSAGES.VALIDATION_MISSING_FIELD(field));
    }
  }

  if (!codeRegex.test(data.codigo)) {
    throw createValidationError(MESSAGES.VALIDATION_INVALID_CODE);
  }

  const numericFields = [
    { field: "costo", message: MESSAGES.VALIDATION_INVALID_COSTO },
    { field: "precio_unitario", message: MESSAGES.VALIDATION_INVALID_PRECIO },
  ];

  for (const { field, message } of numericFields) {
    if (typeof data[field] !== "number" || data[field] <= 0) {
      throw createValidationError(message);
    }
    const decimals = data[field].toString().split(".")[1];
    if (decimals && decimals.length > 2) {
      throw createValidationError(message);
    }
  }
};

export const validateStockValue = (value) => {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    throw createValidationError(MESSAGES.VALIDATION_INVALID_STOCK_VALUE);
  }
};
