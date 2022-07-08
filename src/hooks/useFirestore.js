import { useState, useEffect } from "react";
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
  const getProductos = async(id)=>{
    setLoading(true);
    try {
      const dataRef = collection(db, "menus");
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
  }

  //AGREGA UN COMERCIO
  const addData = async (store) => {
    try {
      setLoading(true);
      const newDoc = {
        id: nanoid(6),
        nombre: store.nombre,
        direccion: store.direccion,
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
        id: id,
        productos: [],
      };

      const dataRef = doc(db, "menus", newCategoria.id);

      await setDoc(dataRef, newCategoria);
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
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
      };

      const dataRef = doc(db, "menus", id);

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

  return [
    data,
    error,
    loading,
    getData,
    addData,
    searchData,
    addCategoria,
    addProducto,
    getProductos
  ];
};
