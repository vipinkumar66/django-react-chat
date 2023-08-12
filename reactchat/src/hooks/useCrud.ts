import jwtinterceptor from "../helpers/jwtinterceptor"
import { BASE_URL } from "../config"
import React from "react"

interface IuseCrud<T> {
  dataCRUD: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initialData:T[], apiURL:string): IuseCrud<T> => {
  const jwtAxios = jwtinterceptor();

  const [dataCRUD, setDataCRUD] = React.useState<T[]>(initialData)
  const [error, setError] = React.useState<Error | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchData = async() =>{
    setIsLoading(true)
    try{

    const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
    const data = response.data
    setDataCRUD(data)
    setIsLoading(false)
    return data;

  }catch(error:any){
    if (error.response && error.response.status === 400 ){
      setError(new Error("400"))
    }
    setIsLoading(false)
    throw error;
  }}
  return {fetchData, dataCRUD, error, isLoading}
}

export default useCrud;


// same code with jsx
// import jwtinterceptor from "../helpers/jwtinterceptor";
// import { BASE_URL } from "../config";
// import React, { useState } from "react";

// const useCrud = (initialData, apiURL) => {
//   const jwtAxios = jwtinterceptor();

//   const [dataCRUD, setDataCRUD] = useState(initialData);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
//       const data = response.data;
//       setDataCRUD(data);
//       setIsLoading(false);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setError(new Error("400"));
//       }
//       setIsLoading(false);
//       throw error;
//     }
//   };

//   return { fetchData, dataCRUD, error, isLoading };
// };

// export default useCrud;
