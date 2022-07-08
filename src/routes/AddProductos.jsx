import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const AddProductos = () => {
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
    getProductos
  ] = useFirestore()

  const initialValue = {
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "sandwich",
  };
  const [producto, setProducto] = useState(initialValue);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProducto(params.id,producto);
    console.log(producto);
    setProducto(initialValue);
    
  };

  return (
    <>
      <div className="text-white">
        <h1>Productos de {params.id}</h1>

        <div className="flex flex-col w-3/4 mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={handleChange}
                value={producto.nombre}
            />
            <input
              type="text"
              name="precio"
              placeholder="Precio"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              onChange={handleChange}
                value={producto.precio}

            />
            <textarea
              name="descripcion"
              placeholder="Descripcion"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              onChange={handleChange}
                value={producto.descripcion}
            />

            <button
              type="submit"
              className="w-full px-4 py-2 leading-tight text-white bg-purple-500 border-0 border-purple-500 rounded-lg hover:bg-purple-700"
            >
              Agregar
            </button>

            <Link to={`/comercio/${params.id}`}>Volver</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductos;
