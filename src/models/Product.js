import db from "../config/firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  writeBatch,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  const products = [];
  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getProductById = async (id) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);
  if (!snapshot.exists()) {
    return null;
  }
  return { id: snapshot.id, ...snapshot.data() };
};

export const addProductToDb = async (productData) => {
  const productRef = await addDoc(productsCollection, productData);
  return { id: productRef.id, ...productData };
};

export const deleteProductFromDb = async (id) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef)
  if (!snapshot.exists()) {
    return null;
  }
  await deleteDoc(productRef);
  return id;
};


export const updateProductStock = async (id, newStock) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);
  if (!snapshot.exists()) {
    return null;
  }
  await updateDoc(productRef, { stock: newStock });
  return { id: snapshot.id, ...snapshot.data(), stock: newStock };
};

//Permite la carga inicial de varios productos a la base de datos
//Usa un batch para enviar todo junto. No valida los datos.
export const seedProductsFromJson = async (products) => {
  const batch = writeBatch(db);
  for (const product of products) {
    const productRef = doc(productsCollection);
    batch.set(productRef, product);
  }
  await batch.commit();
  return products.length;
};
