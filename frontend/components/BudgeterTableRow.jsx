import { useContext } from "react";
import { context } from "../context/MyContext";

function BudgeterTableRow({ data }) {
  const { currencySign } = useContext(context);

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

  const editEntry = () => {
    console.log("editEntry");
  };
  const deleteEntry = () => {
    console.log("deleteEntry");
  };

  return (
    <tr className="entry text-sm text-[white] hover:bg-[#222] transition duration-300" data-id={data._id}>
      {/* Amount */}
      <td className={`entry__amount py-3 px-3 {{ $entry->category !== 'income' ? 'text-[coral]' : 'text-[limegreen]' }}`}>
        {currencySign} {data.amount}
      </td>

      {/* Category */}
      <td className="entry__category py-2 px-3 text-[12px]">{categories.find((x) => x.includes(data.category))[0]}</td>

      {/* Date */}
      <td className="entry__date py-2 px-3 whitespace-nowrap">{data.date}</td>

      {/* Note */}
      <td className="py-2 px-3 w-[200px]">
        <span className="entry__note text-[12px] leading-none">{data.note}</span>
      </td>

      {/* Action Btns */}
      <td className="align-middle whitespace-nowrap pr-3">
        <button
          onClick={editEntry}
          className="inline-block opacity-50 hover:opacity-100 transition border border-[white] px-2 rounded text-sm btn-edit inline-block mr-2"
        >
          Edit
        </button>
        <button onClick={deleteEntry} className="opacity-50 hover:opacity-100 transition border border-[red] text-[red] px-2 rounded text-sm btn-delete">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BudgeterTableRow;
