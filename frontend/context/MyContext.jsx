import { createContext, useState } from "react";

const context = createContext();

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currencySign, setCurrencySign] = useState("$");
  const [mode, setMode] = useState("Add");
  const [budgeterEntries, setBudgeterEntries] = useState([]);

  return (
    <context.Provider value={{ isLoggedIn, setIsLoggedIn, currencySign, setCurrencySign, mode, setMode, budgeterEntries, setBudgeterEntries }}>
      {children}
    </context.Provider>
  );
}

export { context };
