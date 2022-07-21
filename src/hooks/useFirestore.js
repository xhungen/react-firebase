import { useState } from "react";
import { db, auth } from "../firebase";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collectionGroup,
  deleteField,
  FieldValue,
  arrayRemove,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export const useFirestore = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState([]);

  const [loading, setLoading] = useState(false);

  //TRAE TODOS LOS COMERCIOS
  const getData = async () => {
    /* console.log(auth.currentUser); */
    setLoading(true);
    try {
      const dataRef = collection(db, "comercios");

      const q = query(dataRef);
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //TRAE UN COMERCIO POR ID
  const searchData = async (id) => {
    setLoading(true);
    try {
      const dataRef = collection(db, "comercios");
      const q = query(dataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //TRAE UNA LA LISTA DE PRODUCTOS DE UN RESTAURANTE
  const getProductos = async (id) => {
    setLoading(true);
    try {
      const dataRef = collection(db, "comercios");
      const q = query(dataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //AGREGA UN COMERCIO
  const addData = async (store) => {
    try {
      setLoading(true);
      const newDoc = {
        id: nanoid(6),
        nombre: store.nombre,
        direccion: store.direccion,
        productos: [],
        categorias: [],
      };

      const docRef = doc(db, "comercios", newDoc.id);

      await setDoc(docRef, newDoc);

      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategoria = async (id, categoria) => {
    setLoading(true);
    try {
      const newCategoria = {
        nombre: categoria,
        id: nanoid(6),
      };

      const dataRef = doc(db, "comercios", id);

      await updateDoc(dataRef, {
        categorias: arrayUnion(newCategoria),
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (id, producto) => {
    setLoading(true);
    try {
      const newProducto = {
        id: nanoid(6),
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
      };

      const dataRef = doc(db, "comercios", id);

      await updateDoc(dataRef, {
        productos: arrayUnion(newProducto),
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id, idProducto) => {
    setLoading(true);
    try {
      const dataRef = doc(db, "comercios", id);

      const productos = data.find((item) => item.id === id).productos;

      const producto = productos.find((item) => item.id === idProducto);

      await updateDoc(dataRef, {
        productos: arrayRemove(producto),
      });


     


     

    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [
    data,
    error,
    loading,
    getData,
    addData,
    searchData,
    addCategoria,
    addProducto,
    getProductos,
    deleteProducto,
  ];
};
