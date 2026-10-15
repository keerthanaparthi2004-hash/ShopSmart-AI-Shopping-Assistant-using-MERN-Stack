export default function ProductFilter({ selectedCategory, setSelectedCategory, price, setPrice, minRating, setMinRating, setSearch }) {
  const filterCats = ['All','Electronics','Fashion','Sports','Home'];

  return (
    <div className="w-55 bg-white border border-green-100 rounded-lg p-4 h-fit sticky top-20">
      <h3 className="text-[12px] font-bold text-[#052e16]">Filters</h3>

      <p className="text-[11px] font-semibold mt-4">Categories</p>
      <div className="mt-2 space-y-2">
        {filterCats.map(c=>(
          <label key={c} className="flex items-center gap-2 text-[11px] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategory===c}
              onChange={()=>setSelectedCategory(c)}
              className="w-3 h-3 accent-[#052e16]"
            />
            <span className={selectedCategory===c? 'font-semibold text-[#052e16]' : ''}>{c}</span>
          </label>
        ))}
      </div>

      <p className="text-[11px] font-semibold mt-5">Price Range</p>
      <input
        type="range"
        min="0"
        max="1000"
        value={price}
        onChange={e=>setPrice(Number(e.target.value))}
        className="w-full mt-2 accent-[#052e16]"
      />
      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        <span>$0</span><span>${price}</span>
      </div>

      <p className="text-[11px] font-semibold mt-5">Minimum Rating</p>
      <div className="mt-2 space-y-2">
        {[4.5,4,3.5,3].map(r=>(
          <label key={r} className="flex items-center gap-2 text-[11px] cursor-pointer">
            <input
              type="checkbox"
              checked={minRating===r}
              onChange={()=>setMinRating(minRating===r?0:r)}
              className="w-3 h-3 accent-[#052e16]"
            />
            <span className={minRating===r? 'font-semibold text-[#052e16]' : ''}>{r}+ Stars</span>
          </label>
        ))}
      </div>

      <button
        onClick={()=>{setSelectedCategory('All'); setPrice(1000); setMinRating(0); if(setSearch) setSearch('');}}
        className="w-full mt-5 border border-green-100 rounded-md py-1.5 text-[11px] hover:bg-green-50"
      >
        Reset Filters
      </button>
    </div>
  );
}