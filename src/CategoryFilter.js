import React from "react";

const categories = ["All", "Italian", "American", "Japanese", "Indian", "Chinese", "Mexican", "Middle Eastern", "Dessert", "Healthy"];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Filter:</label>
      <select id="category" value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
