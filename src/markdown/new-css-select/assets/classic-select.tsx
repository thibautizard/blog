function ClassicSelect() {
  return (
    <div className="mx-auto my-10 flex max-w-[200px] flex-col gap-2">
      <label className="font-bold text-decoration-underline" htmlFor="select">
        <span>Un {`${"<select>"}`} classique </span>
      </label>
      <select className="rounded-md border border-gray-300 py-1" id="select">
        <option value="1">Apple 🍎</option>
        <option value="2">Banana 🍌</option>
        <option value="3">Cherry 🍒</option>
        <option value="4">Grape 🍇</option>
        <option value="5">Blueberry 🫐</option>
        <option value="9">Kiwi 🥝</option>
        <option value="10">Lemon 🍋</option>
      </select>
    </div>
  );
}

export default ClassicSelect;
