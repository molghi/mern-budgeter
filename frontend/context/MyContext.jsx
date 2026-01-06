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
  const [flashMessageContent, setFlashMessageContent] = useState([]); // arr: [msgType, msgText]
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shownMainBlock, setShownMainBlock] = useState(
    localStorage.getItem("budgeter_last_selected") ? +JSON.parse(localStorage.getItem("budgeter_last_selected")) : 0
  ); // 0 for budgeter/tracker, 1 for planner
  const [plannerForm, setPlannerForm] = useState(null); // form to Add/Edit event in Planner. Values: null (do not show), 'add', 'edit'.
  const [userBalance, setUserBalance] = useState(0);
  const [clickedDate, setClickedDate] = useState(null);
  const [plannerEntries, setPlannerEntries] = useState([]); // fetched from db
  const [highlightedDay, setHighlightedDay] = useState("");
  const [lastMonthRemains, setLastMonthRemains] = useState(0);
  const [monthsPureRemains, setMonthsPureRemains] = useState([]); // arr of nums: sums of remains for each month
  const [plannerItemInEdit, setPlannerItemInEdit] = useState(null); // either null or obj
  const [weekStartsOnMon, setWeekStartsOnMon] = useState(false);

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
        plannerForm,
        setPlannerForm,
        userBalance,
        setUserBalance,
        clickedDate,
        setClickedDate,
        plannerEntries,
        setPlannerEntries,
        highlightedDay,
        setHighlightedDay,
        lastMonthRemains,
        setLastMonthRemains,
        monthsPureRemains,
        setMonthsPureRemains,
        plannerItemInEdit,
        setPlannerItemInEdit,
        weekStartsOnMon,
        setWeekStartsOnMon,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { context };
