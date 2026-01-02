function PlannerMonthTable() {
  return (
    <table className="min-w-full border border-gray-700 text-white">
      {/* headers */}
      <thead className="bg-gray-800">
        <tr className="text-sm">
          <th className="px-3 py-2 text-left border-b border-gray-600">Title</th>
          <th className="px-3 py-2 text-left border-b border-gray-600">Amount</th>
          <th className="px-3 py-2 text-left border-b border-gray-600">When</th>
        </tr>
      </thead>

      {/* rows */}
      <tbody className="bg-gray-900">
        {/* <tr className=" border-b border-gray-700 text-sm">
          <td className="px-3 py-2">Groceries</td>
          <td className="px-3 py-2">$50</td>
          <td className="px-3 py-2 whitespace-nowrap">2026-01-20</td>
        </tr> */}
      </tbody>
    </table>
  );
}

export default PlannerMonthTable;
