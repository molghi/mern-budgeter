import { createContext, useState } from "react";

const context = createContext();

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currencySign, setCurrencySign] = useState("$");
  const [mode, setMode] = useState("Add"); // either Add or Edit
  const [budgeterEntries, setBudgeterEntries] = useState([]); // fetched from db
  const [itemInEdit, setItemInEdit] = useState(null); // either null or obj
  const [period, setPeriod] = useState(`${new Date().getMonth() + 1}-${new Date().getFullYear()}`); // month-year for Summary

  return (
    <context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currencySign,
        setCurrencySign,
        mode,
        setMode,
        budgeterEntries,
        setBudgeterEntries,
        itemInEdit,
        setItemInEdit,
        period,
        setPeriod,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { context };
