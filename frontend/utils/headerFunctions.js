import axios from "axios";

async function changeUsername(setUsername, setFlashMessageContent) {
  let answer = prompt("Enter your new username");
  if (!answer || answer.trim().length < 2) return;

  try {
    const response = await axios.post(
      "http://localhost:8000/username",
      { newUsername: answer.trim() },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setFlashMessageContent(["success", "Username updated!"]);
      setUsername(answer.trim());
    }
  } catch (error) {
    console.log(error);
  }
}

// ============================================================================

function changeWeekStart(setWeekStartsOnMon) {
  // setWeekStartsOnMon;
}

// ============================================================================

function changeCurrencySign(setCurrencySign, setFlashMessageContent) {
  const allowedCurrencies = [
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
    { label: "₾", value: "GEL" },
    { label: "¥", value: "JPY" },
    { label: "₽", value: "RUB" },
    { label: "₺", value: "TRY" },
    { label: "₹", value: "INR" },
    // { label: "USD", value: "USD" },
    // { label: "EUR", value: "EUR" },
    // { label: "GBP", value: "GBP" },
    // { label: "GEL", value: "GEL" },
    // { label: "RUB", value: "RUB" },
    // { label: "BYN", value: "BYN" },
    // { label: "UAH", value: "UAH" },
    // { label: "KZT", value: "KZT" },
  ];

  let answer = prompt(
    `Enter new currency sign\n\nAllowed options: ${allowedCurrencies.map((x) => x.label).join(", ")}.`
  );

  if (!answer || !answer.trim()) return;

  if (
    !allowedCurrencies
      .map((x) => [x.label, x.value])
      .flat()
      .includes(answer.trim())
  ) {
    return setFlashMessageContent(["error", "Currency sign not recognized."]);
  }

  setCurrencySign(answer.trim());
  setFlashMessageContent(["success", "Currency sign changed!"]);
  localStorage.setItem("budgeter_currency_sign", JSON.stringify(answer.trim()));
}

// ============================================================================

export { changeUsername, changeWeekStart, changeCurrencySign };
