"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [abrir, setAbrir] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editar, setEditar] = useState(false);
  const [cantanteId, setCantanteId] = useState(null);
  const [abrirEliminar, setAbrirEliminar] = useState(false);

  const [nuevoCantante, setnuevoCantante] = useState({
    nombre: "",
    fecha_nacimiento: "",
    nacionalidad: "",
    genero: "",
    biografia: "",
  });

  const [cantantes, setCantantes] = useState([]);

  useEffect(() => {
    fetchCantantes();
  }, []);

  const abrirModel = () => {
    setAbrir(true);
  };

  const cerrarModal = () => {
    setAbrir(false);
  };

  const abrirModelEliminar = () => {
    setAbrirEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setAbrirEliminar(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    let errs = validar();
    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);
    setnuevoCantante({
      nombre: "",
      fecha_nacimiento: "",
      nacionalidad: "",
      genero: "",
      biografia: "",
    });

    if (editar) {
      await actualizarCantante(cantanteId);
      setEditar(false);
      setCantanteId(null);
    } else {
      await crearCantante();
    }

    cerrarModal();
  };

  const handleChange = (e) =>
    setnuevoCantante({ ...nuevoCantante, [e.target.name]: e.target.value });

  const validar = () => {
    let errors = {};

    if (!nuevoCantante.nombre) {
      errors.nombre = "El nombre es requerido";
    }
    if (!nuevoCantante.fecha_nacimiento) {
      errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
    }
    if (!nuevoCantante.nacionalidad) {
      errors.nacionalidad = "La nacionalidad es requerida";
    }
    if (!nuevoCantante.genero) {
      errors.genero = "El género es requerido";
    }
    if (!nuevoCantante.biografia) {
      errors.biografia = "La biografía es requerida";
    }
    return errors;
  };

  const fetchCantantes = async () => {
    try {
      const response = await axios.get("/api/");
      console.log(response.data); // Ensure the response data structure matches your expectations
      setCantantes(response.data.data);
    } catch (error) {
      setCantantes([]);
      console.error("Error fetching cantantes:", error);
    }
  };

  const fetchCantante = async () => {
    try {
      const response = await axios.get(`/api/`);
      console.log(response.data); // Ensure the response data structure matches your expectations
      setCantantes(response.data.data);
    } catch (error) {
      console.error("Error fetching cantantes:", error);
    }
  };

  const crearCantante = async () => {
    try {
      await axios.post("/api", nuevoCantante);
      fetchCantantes();
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarCantante = async (id) => {
    try {
      await axios.put(`/api/${id}`, nuevoCantante);
      fetchCantantes();
    } catch (error) {
      console.error(error);
    }
  };

  const editarCantante = (cantante) => {
    setCantanteId(cantante._id);
    setnuevoCantante({
      nombre: cantante.nombre,
      fecha_nacimiento: cantante.fecha_nacimiento,
      nacionalidad: cantante.nacionalidad,
      genero: cantante.genero,
      biografia: cantante.biografia,
    });
    setEditar(true);
    abrirModel();
  };

  const clickEliminarCantante = (cantante) =>{
    setCantanteId(cantante._id);
    abrirModelEliminar()
  }

  const eliminarCantante = async () => {
    try {
      await axios.delete(`/api/${cantanteId}`);
      fetchCantantes();
      cerrarModalEliminar();
      setCantanteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="w-full z-20 top-0 start-0 border-none mt-10	 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-14">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="icon.png" className="w-16" alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white    font-medium rounded-xl text-sm px-4 py-4 text-center border-solid border-2 border-amber-200 "
            >
              Ver en opensea
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Drops
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Activity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Company
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="content-banner flex flex-row items-center pl-32 ">
        <div className="content-text w-3/6">
          <h1 className="text-7xl font-bold text-white mt-10">
            COLLECT MOTHER MARY ART <span className="border-elipse">NFT</span>
          </h1>
          <h4 className="text-xl text-white mt-4">
            Find the best upcoming and live NFT drops. Moonly provides analytics
            to help you make good NFT investments.
          </h4>
          <button className="mt-4 font-bold rounded-xl text-sm px-5 py-5 text-center  bg-yellow-500">
            VER EN OPENSEA
          </button>
          <img src="lineas.png" alt="" className="absolute w-16 left-20" />
        </div>
        <div className="content-img w-2/5">
          <img src="person.png" alt="" />
          <img
            src="star.png"
            alt=""
            className="absolute h-14 w-14 top-full end-4"
          />
        </div>
      </div>
      <div className="box">
        FOR USERS / FOR USERS / FOR USERS / FOR USERS / FOR USERS / FOR USERS
      </div>

      <div className="content-cantantes mt-10 p-4">
        <div className="p-6 justify-items-end backdrop-blur-sm bg-white/10 dark:bg-slate-900/4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
          <button
            type="button"
            className="text-white    font-medium rounded-xl text-sm px-4 py-4 text-center border-solid border-2 border-amber-200 mb-2 "
            onClick={abrirModel}
          >
            Agregar Cantante
          </button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NOMBRE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    FECHA DE NACIMIENTO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GÉNERO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GÉNERO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BIOGRAFÍA
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(cantantes) &&
                  cantantes.map((cantante, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cantante._id}
                      </th>
                      <td className="px-6 py-4">{cantante.nombre}</td>
                      <td className="px-6 py-4">{cantante.fecha_nacimiento}</td>
                      <td className="px-6 py-4">{cantante.nacionalidad}</td>
                      <td className="px-6 py-4">{cantante.genero}</td>
                      <td className="px-6 py-4">{cantante.biografia}</td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          onClick={() => editarCantante(cantante)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                        >
                          Editar
                        </a>
                        <a
                          href="#"
                          onClick={()=> clickEliminarCantante(cantante)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Eliminar
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {abrir && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editar ? "Modificar cantante" : "Crear Cantante"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={cerrarModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="p-4 md:p-5 space-y-4 h-72 overflow-auto">
                <div className="mb-6">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    onChange={handleChange}
                    value={nuevoCantante.nombre}
                    name="nombre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="fecha-nacimiento"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="fecha-nacimiento"
                    value={nuevoCantante.fecha_nacimiento}
                    onChange={handleChange}
                    name="fecha_nacimiento"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="nacionalidad"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nacionalidad
                  </label>
                  <input
                    type="text"
                    id="nacionalidad"
                    value={nuevoCantante.nacionalidad}
                    onChange={handleChange}
                    name="nacionalidad"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nacionalidad"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="genero"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Género
                  </label>
                  <input
                    type="text"
                    id="genero"
                    value={nuevoCantante.genero}
                    onChange={handleChange}
                    name="genero"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Género"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="biografia"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Biografía
                  </label>
                  <textarea
                    id="biografia"
                    value={nuevoCantante.biografia}
                    onChange={handleChange}
                    name="biografia"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Biografía"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {editar ? "Modifica" : "Guardar"}
                </button>
                <button
                  onClick={cerrarModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {abrirEliminar && (
        <div
          id="popup-modal"
          tabindex="-1"
          class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
              onClick={cerrarModalEliminar}
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Cerrar modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Esta seguro de eliminar el cantante.
                </h3>
                <button
                  onClick={eliminarCantante}
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                 Si, eliminar
                </button>
                <button
                  onClick={cerrarModalEliminar}
                  data-modal-hide="popup-modal"
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
