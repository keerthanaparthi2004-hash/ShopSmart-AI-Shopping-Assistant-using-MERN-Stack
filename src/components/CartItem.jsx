export default function CartItem({ item, onInc, onDec, onRemove }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-4">
      <img
        src={item.img || item.thumbnail}
        className="w-20 h-20 object-contain bg-gray-50 rounded"
      />
      <div className="flex-1">
        <p className="text-[12px] font-medium">{item.title}</p>
        <p className="text-[10px] text-gray-500 mt-1">{item.mappedCategory || item.category}</p>
        <p className="text-[12px] font-bold mt-2">${item.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={()=>onDec(item.id)}
            className="w-6 h-6 border rounded flex items-center justify-center text-[12px]"
          >
            -
          </button>
          <span className="text-[11px] font-bold">{item.qty}</span>
          <button
            onClick={()=>onInc(item.id)}
            className="w-6 h-6 border rounded flex items-center justify-center text-[12px]"
          >
            +
          </button>
          <button
            onClick={()=>onRemove(item.id)}
            className="ml-4 text-[10px] text-red-500 border border-red-200 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-[12px] font-bold">${(item.price * item.qty).toFixed(2)}</p>
    </div>
  );
}