function CategoryBar({ categories = [], active, onChange }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-start lg:justify-center gap-4 overflow-x-auto no-scrollbar w-full pb-4">
        {categories.map((item) => {
          const isActive = item === active;
          const buttonStyle = `
            flex-shrink-0 py-2 px-11 rounded-full font-semibold whitespace-nowrap
            transition duration-500 border border-[#C1D0E1] hover:bg-[#EFF2F6] cursor-pointer
            ${
              isActive
                ? "bg-[#EFF2F6] text-black"
                : "text-black hover:bg-[#EFF2F6]"
            }
          `;
          return (
            <button
              key={item}
              name={item}
              className={buttonStyle}
              onClick={() => {onChange(item)}}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBar;
