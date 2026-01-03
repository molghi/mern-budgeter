const getMonthsRemains = (allDocs, howManyMonths, currentBalance) => {
  const start = new Date(); // get now
  start.setDate(1); // set to month start
  start.setHours(0, 0, 0, 0); // hours too

  const sums = new Array(howManyMonths).fill(0); // init arr of sums for each month

  allDocs.forEach((doc) => {
    const docDateStr = new Date(doc.date); // get doc date string
    const yearDiff = docDateStr.getFullYear() - start.getFullYear(); // get diff in years between: current doc & set period start
    const monthDiff = docDateStr.getMonth() - start.getMonth(); // get diff in months between: current doc & set period start
    const diff = yearDiff * 12 + monthDiff; // convert yearDiff to months, adds monthDiff = get total monthDiff

    if (diff >= 0 && diff < howManyMonths) {
      sums[diff] += doc.amount; // if within bound, increment val in arr of sums for each month
    }
  });

  // if first month: add current balance -- if not first month: add Remains from last month
  sums.forEach((x, i, a) => {
    if (i > 0) a[i] += a[i - 1];
    else a[i] += currentBalance;
  });

  return sums;
};

export { getMonthsRemains };
