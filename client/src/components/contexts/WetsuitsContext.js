import { createContext, useState, useEffect } from "react";
import * as React from "react";

export const WetsuitsContext = createContext();

// CONTEXT to provide all product metadata (item  & company information)
export const DataProvider = ({ children }) => {
  const [wetsuits, setWetsuits] = useState(null);
 
  useEffect(() => {
    // Gets all WETSUITS from database ///////////////////////////////////
    fetch("/wetsuits")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setWetsuits(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
//console.log(wetsuits)
      return (
        <WetsuitsContext.Provider value={{wetsuits}}>
            {children}
        </WetsuitsContext.Provider>
    )
}