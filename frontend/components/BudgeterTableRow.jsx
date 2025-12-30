import { useContext } from "react";
import { context } from "../context/MyContext";
import axios from "axios";

function BudgeterTableRow({ data }) {
  const { currencySign, setItemInEdit, setBudgeterEntries, setFlashMessageContent, period } = useContext(context);

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

  const categoryColors = {
    groceries: "#FF7F7F", // pink
    housing: "#7FB3FF", // light blue
    transport: "#7FFFBA", // mint green
    dining: "#FFFF7F", // pastel yellow
    medical: "#FFBF7F", // vibrant peach
    entertainment: "#BF7FFF", // lavender
    shopping: "#FF7FBF", // saturated magenta
    education: "#7FFFBF", // aqua
    subscriptions: "#FFDF7F", // soft orange
    travel: "#7FCFFF", // bright sky blue
    personal_care: "#FFDFBF", // apricot
    gifts: "#BFFF7F", // light green
    electronics: "#DF7FFF", // saturated lilac
    misc_other: "#FF7F7F", // redder soft red
    income: "limegreen",
  };

  const deleteEntry = async () => {
    const answer = confirm(
      `Are you sure you want to delete this entry?\n\n${currencySign}${data.amount} — ${
        categories.find((x) => x.includes(data.category))[0]
      }\n\nThis action cannot be undone.`
    );
    if (!answer) return;
    try {
      const response = await axios.delete(`http://localhost:8000/entries/${data._id}`);
      if (response.status === 200) {
        const allUserEntries = await axios.get(`http://localhost:8000/entries?period=${period}`); // fetch all user entries
        setBudgeterEntries(allUserEntries.data.documents);
        setFlashMessageContent(["success", "Entry deleted!"]);
      }
    } catch (error) {
      console.error("OOPS!", error);
      setFlashMessageContent(["error", "Unfortunately, there was an error."]);
    }
  };

  return (
    <tr className="entry text-sm text-[white] hover:bg-[#222] transition duration-300" data-id={data._id}>
      {/* Amount */}
      <td className={`entry__amount py-3 px-3 {{ $entry->category !== 'income' ? 'text-[coral]' : 'text-[limegreen]' }}`}>
        {currencySign} {data.amount}
      </td>

      {/* Category */}
      <td
        className={`entry__category py-2 px-3 text-[12px] text-[${categoryColors[data.category]}]`}
        title={categories.find((x) => x.includes(data.category))[0]}
      >
        {categories.find((x) => x.includes(data.category))[0]}
      </td>

      {/* Date */}
      <td className="entry__date py-2 px-3 whitespace-nowrap">{data.date}</td>

      {/* Note */}
      <td className="py-2 px-3 w-[200px]">
        <span className="entry__note text-[12px] leading-none" title={data.note}>
          {data.note}
        </span>
      </td>

      {/* Action Btns */}
      <td className="align-middle whitespace-nowrap pr-3">
        <button
          onClick={() => setItemInEdit({ ...data })}
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
