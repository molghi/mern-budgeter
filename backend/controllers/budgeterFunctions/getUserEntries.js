const mongoose = require("mongoose");
const entryModel = require("../../models/entryModel");

module.exports = async function getUserEntries(req, res) {
  if (!req.query.period || !req.query.period.trim()) {
    return res.status(400).json({ msg: "Period not set" });
  }

  const [month, year] = req.query.period.split("-").map((x) => +x);

  if (isNaN(month) || isNaN(year)) {
    return res.status(400).json({ msg: "Period set incorrectly" });
  }

  // set start and end of period (in proper format for query)
  const periodStart = new Date(year, month - 1, 1);
  const periodEnd = new Date(year, month, 0, 23, 59, 59);

  try {
    // match by current user and start-end periods:
    const response = await entryModel.find({
      // userId: req.user.id, // NOTE: that works if userId in db is stored as string -- if userId is stored as ObjectId (Mongoose default for _id), you must convert req.user.id to ObjectId:
      userId: new mongoose.Types.ObjectId(req.user.id),
      // $expr: {
      //   $and: [
      //     { $gte: [{ $dateFromString: { dateString: "$date" } }, periodStart] },
      //     { $lte: [{ $dateFromString: { dateString: "$date" } }, periodEnd] },
      //   ],
      // },
      date: { $gte: periodStart, $lte: periodEnd }, // this is less involved than the commented out right above
    });

    return res.status(200).json({
      msg: "Returning user entries",
      documents: response,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error("OOPS!", error);
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
