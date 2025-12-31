import { createContext, useState } from "react";

const context = createContext();

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currencySign, setCurrencySign] = useState("$");
  const [mode, setMode] = useState("Add"); // either Add or Edit
  const [budgeterEntries, setBudgeterEntries] = useState([]); // fetched from db
  const [itemInEdit, setItemInEdit] = useState(null); // either null or obj
  const [period, setPeriod] = useState(`${new Date().getMonth() + 1}-${new Date().getFullYear()}`); // month-year for Summary
  const [totalsPerCategory, setTotalsPerCategory] = useState(null); // either null or obj
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessageContent, setFlashMessageContent] = useState([]);
  const [username, setUsername] = useState("Jackie Boy");
  const [userEmail, setUserEmail] = useState("");
  const [shownMainBlock, setShownMainBlock] = useState(0); // 0 for budgeter/tracker, 1 for planner

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
        totalsPerCategory,
        setTotalsPerCategory,
        isLoading,
        setIsLoading,
        flashMessageContent,
        setFlashMessageContent,
        username,
        setUsername,
        shownMainBlock,
        setShownMainBlock,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { context };
