const entryModel = require("../../models/entryModel");

module.exports = async function getUserSummary(req, res) {
  if (!req.query.period.trim()) return res.status(400).json({ msg: "No period passed" });

  const [month, year] = req.query.period.split("-").map((x) => +x);
  if (isNaN(month) || isNaN(year)) return res.status(400).json({ msg: "Period wasn't correctly formatted" });

  // for the selected month-year period, get these things:

  const totalIncome = await entryModel.aggregate([
    {
      $addFields: {
        dateObj: { $dateFromString: { dateString: "$date" } }, // convert simplified date string to needed date string
      },
    },

    {
      $match: {
        category: "Income", // get only entries where category == "Income"
        $expr: {
          $and: [
            { $eq: [{ $month: "$dateObj" }, month] }, // match by month
            { $eq: [{ $year: "$dateObj" }, year] }, // match by year
          ],
        },
      },
    },

    {
      $group: { _id: null, totalAmount: { $sum: "$amount" } }, // calc total sum of those docs (by amount field)
    },
  ]);

  // ============================================================================

  const totalExpenses = await entryModel.aggregate([
    {
      $addFields: {
        dateObj: { $dateFromString: { dateString: "$date" } }, // convert simplified date string to needed date string
      },
    },

    {
      $match: {
        category: { $ne: "Income" }, // get only entries where category != "Income"
        $expr: {
          $and: [
            { $eq: [{ $month: "$dateObj" }, month] }, // match by month
            { $eq: [{ $year: "$dateObj" }, year] }, // match by year
          ],
        },
      },
    },

    {
      $group: { _id: null, totalAmount: { $sum: "$amount" } }, // calc total sum of those docs (by amount field)
    },
  ]);

  // ============================================================================

  // Distribution of Expenses by Category:  get an array/obj of: category, its total sum
  const categoryExpenses = await entryModel.aggregate([
    {
      $addFields: {
        dateObj: { $dateFromString: { dateString: "$date" } }, // convert simplified date string to needed date string
      },
    },

    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $month: "$dateObj" }, month] }, // match by month
            { $eq: [{ $year: "$dateObj" }, year] }, // match by year
          ],
        },
      },
    },

    {
      $group: { _id: "$category", totalAmount: { $sum: "$amount" } }, // get totals per category
    },
  ]);

  // ============================================================================

  return res.status(200).json({ msg: "Returning user summary", totalIncome, totalExpenses, categoryExpenses });
};
