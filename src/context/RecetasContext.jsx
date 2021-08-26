import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);

  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });

  const [consultar, guardarConsulta] = useState(false);

  const { nombre, categoria } = busqueda;

  useEffect(() => {
    if (consultar) {
      const consultaRecetasApi = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const consulta = await axios.get(url);
        guardarRecetas(consulta.data.drinks);
        guardarConsulta(false);
      };
      consultaRecetasApi();
    }
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsulta,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
