// SlidbarFilter.jsx
import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Star } from "lucide-react";

function SlidbarFilter({
  visible,
  setVisible,
  filters,
  setFilters,
  onApply,
  onReset,
  maxPrice,
  categories=[],
}) {
  // تقييم العملاء
  const handleRatingClick = (value) =>
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === value ? null : value, // يمكن إلغاء الاختيار
    }));

  // الترتيب
  const handleSortChange = (e) =>
    setFilters((prev) => ({ ...prev, sort: e.target.value }));

  // السعر
  const handlePriceChange = (index, value) =>
    setFilters((prev) => {
      const updated = [...prev.price];
      updated[index] = Number(value);
      if (updated[0] > updated[1]) updated[index === 0 ? 1 : 0] = updated[index];
      return { ...prev, price: updated };
    });

  // التصنيف
  const handleCategoryChange = (e) =>
    setFilters((prev) => ({ ...prev, category: e.target.value }));

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={() => setVisible(false)}
      style={{
        width: "430px",
        backgroundColor: "white",
        padding: "1.5rem",
        overflowY: "auto",
      }}
      className="rounded-l-2xl shadow-xl"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Filter</h2>

      {/* تقييم العملاء */}
      <div className="mb-8">
        <p className="text-lg font-medium text-gray-800 mb-3">Customer Review</p>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((num) => (
            <div
              key={num}
              onClick={() => handleRatingClick(num)}
              className={`flex justify-between items-center border rounded-lg p-2 cursor-pointer transition-all ${
                filters.rating === num
                  ? "border-pink-400 bg-pink-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < num ? "text-yellow-400" : "text-gray-300"}`}
                    fill={i < num ? "#facc15" : "none"}
                  />
                ))}
              </div>
              <input
                type="radio"
                name="rating"
                checked={filters.rating === num}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>

      {/* الترتيب */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-800 mb-2">
          Sort by
        </label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-pink-400"
        >
          <option value="default">Default Sorting</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="rating_high_low">Rating: High to Low</option>
        </select>
      </div>

      {/* السعر */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-800 mb-3">
          Product Price
        </label>
        <div className="flex justify-between text-sm text-pink-600 font-semibold mb-1">
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={filters.price[0]}
          onChange={(e) => handlePriceChange(0, e.target.value)}
          className="w-full accent-pink-500 mb-2"
        />
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={filters.price[1]}
          onChange={(e) => handlePriceChange(1, e.target.value)}
          className="w-full accent-pink-500"
        />
      </div>

      {/* التصنيف */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-800 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-pink-400"
        >
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
          {/* <option value="">Select Category</option>
          <option value="Men's Clothing">Men's Clothing</option>
          <option value="Women's Clothing">Women's Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option> */}
        </select>
      </div>

      {/* أزرار التنفيذ */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onApply}
          className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Apply Filter
        </button>
        <button
          onClick={onReset}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Reset
        </button>
      </div>
    </Sidebar>
  );
}

export default SlidbarFilter;
