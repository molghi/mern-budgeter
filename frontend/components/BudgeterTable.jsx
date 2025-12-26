function BudgeterTable() {
  const tableColumns = ["Amount", "Category", "Date", "Note", "Actions"];

  return (
    <>
      <div className="flex-1">
        <div className="p-4 pt-0 bg-black text-[white] rounded">
          <h4 className="mb-3 text-center text-xl font-bold text-[khaki]">Entries</h4>

          <table className="w-full border border-[gray] text-[gray] rounded">
            <thead className="bg-black/80">
              <tr>
                {/* Table headers */}
                {tableColumns.map((x, i) => (
                  <th key={i} className="py-2 px-3 text-green-500 text-left">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[gray]">
              {/* @if (count($entries) > 0)
            @foreach($entries as $entry)
                <tr className="entry text-sm text-[white] hover:bg-[#111]" data-id="{{$entry->id}}">
                    <td className="entry__amount py-3 px-3 {{ $entry->category !== 'income' ? 'text-[coral]' : 'text-[limegreen]' }}">{{$currency_sign}} {{$entry->amount}}</td>
                    <td className="entry__category py-2 px-3">{{$entry->category}}</td>
                    <td className="entry__date py-2 px-3">{{substr($entry->date, 0, 10)}}</td>
                    <td style="width: 200px;" className="py-2 px-3">
                        <span className="entry__note text-[12px] leading-none">{{$entry->note}}</span>
                    </td>
                    <td className="align-middle">
                         ACTION BUTTONS 
                        <a href="/dashboard/edit/{{$entry->id}}" className="inline-block opacity-50 hover:opacity-100 transition border border-[white] px-1 rounded text-sm btn-edit">Edit</a>
                        <form className="inline-block" action="{{ route('entry.delete', $entry->id) }}" METHOD="POST">
                             @csrf 
                             @method("DELETE") 
                            <button onclick="return confirm('Are you sure you want to delete this entry?\nThis action cannot be undone.')" type="submit" className="opacity-50 hover:opacity-100 transition border border-[red] text-[red] px-1 rounded text-sm btn-delete">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        @else 
            <tr>
                <td colspan="5" className="italic text-center py-4 text-[white]">Your entries will show here.</td>
            </tr>
        @endif */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BudgeterTable;
