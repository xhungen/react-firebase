import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const Comercio = () => {
  const params = useParams();

  const [
    data,
    error,
    loading,
    getData,
    addData,
    searchData,
    addCategoria,
    addProducto,
    getProductos,
  ] = useFirestore();

  useEffect(() => {
    getProductos(params.id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-16 text-white">
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.nombre}</h1>
          <p>{item.direccion}</p>
          <h1 className="my-5 font-semibold">Productos</h1>
         
        </div>
      ))}

      <div>
        <Link to={`/agregar-producto/${params.id}`}>Agregar Producto</Link>
      </div>
    </div>
  );
};
export default Comercio;
