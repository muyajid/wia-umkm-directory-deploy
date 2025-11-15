export default function TextField({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-[15px] p-3 
  text-sm transition duration-200
  focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none"
        rows="3"
      />
    </div>
  );
}
