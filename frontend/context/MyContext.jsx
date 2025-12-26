import { createContext, useState } from "react";

const context = createContext();

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currencySign, setCurrencySign] = useState("$");
  const [mode, setMode] = useState("Add");

  return <context.Provider value={{ isLoggedIn, setIsLoggedIn, currencySign, setCurrencySign, mode, setMode }}>{children}</context.Provider>;
}

export { context };
