export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex-1 max-w-md mx-6">
      <input
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder="Search for products..."
        className="w-full border border-green-100 rounded-full px-4 py-2 text-[11px] bg-green-50/50 outline-none focus:ring-1 focus:ring-[#052e16]"
      />
    </div>
  );
}