import axios from "axios";

const changePeriod = (flag, period, setPeriod) => {
  const [month, year] = period.split("-").map((x) => +x);
  let newMonth = month;
  let newYear = year;
  if (flag === "prev") {
    // decrement month
    newMonth = month - 1;
    if (newMonth === 0) {
      newMonth = 12;
      newYear = year - 1;
    }
  } else if (flag === "next") {
    // increment month
    newMonth = month + 1;
    if (newMonth === 13) {
      newMonth = 1;
      newYear = year + 1;
    }
  } else {
    // set to current month and year
    newMonth = new Date().getMonth() + 1;
    newYear = new Date().getFullYear();
  }
  setPeriod(`${newMonth}-${newYear}`);
};

// ============================================================================

const fetchPeriodTotals = async (period, setTotalExpenses, setTotalIncome, setTotalsPerCategory, setIsLoading) => {
  setIsLoading(true);
  const response = await axios.get(`http://localhost:8000/summary?period=${period}`);
  setIsLoading(false);
  if (response.status === 200) {
    if (response.data.totalExpenses.length > 0) {
      setTotalExpenses(response.data.totalExpenses[0].totalAmount);
    } else {
      setTotalExpenses(0);
    }

    if (response.data.totalIncome.length > 0) {
      setTotalIncome(response.data.totalIncome[0].totalAmount);
    } else {
      setTotalIncome(0);
    }

    if (response.data.categoryExpenses.length > 0) {
      setTotalsPerCategory(response.data.categoryExpenses);
    } else {
      setTotalsPerCategory(null);
    }
  }
};

// ============================================================================

export { changePeriod, fetchPeriodTotals };
