const entryModel = require("../../models/entryModel");

const categories = [
  ["Groceries", "groceries"],
  ["Housing (rent, utilities)", "housing"],
  ["Transportation (fuel, public transport)", "transport"],
  ["Food & Dining", "dining"],
  ["Healthcare & Medical", "medical"],
  ["Entertainment (movies, games, hobbies)", "entertainment"],
  ["Shopping & Apparel", "shopping"],
  ["Education (courses, books, tuition)", "education"],
  ["Subscriptions & Memberships", "subscriptions"],
  ["Travel & Vacation", "travel"],
  ["Personal Care", "personal_care"],
  ["Gifts & Donations", "gifts"],
  ["Electronics & Gadgets", "electronics"],
  ["Misc / Other", "misc_other"],
  ["Income", "income"],
];

// ============================================================================

const isValidDate = (str) => {
  if (!/^(197\d|198\d|199\d|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(str)) {
    return false;
  }
  const d = new Date(str);
  return !isNaN(d) && d.toISOString().startsWith(str);
  // What this enforces: Year: 1970–2099, Month: 01–12, Day: 01–31, Exact YYYY-MM-DD format
};

// ============================================================================

module.exports = async function createBudgeterEntry(req, res) {
  // get data
  const { amount, category, date, note } = req.body;

  // validate (optionally return errors)
  // -- amount must be positive number
  if (Number(amount) === 0 || isNaN(Number(amount)) || Number(amount) < 0) {
    return res.status(400).json({ msg: "Amount must be positive number" });
  }
  // -- category must be existing category
  if (!categories.flat().includes(category.trim())) {
    return res.status(400).json({ msg: "Category must be existing category" });
  }
  // -- date must be valid date
  if (!isValidDate(date.trim())) {
    return res.status(400).json({ msg: "Date must be valid date" });
  }

  // compose obj w/ all necessary props
  const newEntry = {
    // userId: "64f1c2a9b3e4d5f6a7b8c9d0", // HARDCODED
    userId: req.user.id,
    amount: +amount.trim(),
    category: category.trim(),
    date: date.trim(),
    note: note.trim(),
  };

  // insert into db
  try {
    const insertedDoc = await entryModel.create(newEntry);

    // return response
    return res.status(200).json({ msg: "Good to go", document: insertedDoc });
  } catch (error) {
    console.error("OOPS!", error);
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
