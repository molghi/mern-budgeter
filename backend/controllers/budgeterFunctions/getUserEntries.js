const entryModel = require("../../models/entryModel");

module.exports = async function getUserEntries(req, res) {
  if (!req.query.period || !req.query.period.trim()) return res.status(400).json({ msg: "Period not set" });

  const [month, year] = req.query.period.split("-").map((x) => +x);
  if (isNaN(month) || isNaN(year)) return res.status(400).json({ msg: "Period set incorrectly" });

  // set start and end of period for query
  const periodStart = new Date(year, month - 1, 1);
  const periodEnd = new Date(year, month, 0, 23, 59, 59);

  try {
    // const response = await entryModel.find({
    //   date: { $gte: periodStart, $lte: periodEnd }, // won't work cuz 'date' is formatted like 'yyyy-mm-dd'
    // });

    const response = await entryModel.find({
      $expr: {
        $and: [{ $gte: [{ $dateFromString: { dateString: "$date" } }, periodStart] }, { $lte: [{ $dateFromString: { dateString: "$date" } }, periodEnd] }],
      },
    });

    return res.status(200).json({ msg: "Returning user entries", documents: response });
  } catch (error) {
    console.error("OOPS!", error);
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
