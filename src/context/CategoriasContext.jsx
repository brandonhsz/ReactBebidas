import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//crear el context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {
  const [categorias, guardarCategorias] = useState([]);

  useEffect(() => {
    const llamadoApi = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categoriasApi = await axios.get(url);

      guardarCategorias(categoriasApi.data.drinks);
    };
    llamadoApi();
  }, []);

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
