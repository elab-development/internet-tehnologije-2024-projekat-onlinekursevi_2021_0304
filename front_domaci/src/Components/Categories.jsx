import React, { useState } from "react";
import Navigation from "./Navigation";
import "./Categories.css";

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, naziv: "Programiranje" },
        { id: 2, naziv: "Matematika" },
        { id: 3, naziv: "Fizika" },
        { id: 4, naziv: "Dizajn" },
        { id: 5, naziv: "Ekonomija" },
        { id: 6, naziv: "Računarske nauke" },
        { id: 7, naziv: "Marketing" },
        { id: 8, naziv: "Elektronika" },
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");

    const addCategory = (e) => {
        e.preventDefault();
        setCategories([...categories, { id: categories.length + 1, naziv: newCategory }]);
        setNewCategory("");
        setError("");
    };

    return (
        <div className="categories-body">
            <Navigation />
            <h1>Kategorije Kurseva</h1>
            
            <form onSubmit={addCategory}>
                <label htmlFor="new-category">Dodaj novu kategoriju:</label>
                <input
                    type="text"
                    id="new-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                />
                <button type="submit">Dodaj</button>
            </form>
            {error && <p className="error">{error}</p>}
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.id}>{category.naziv}</li>
                ))}
            </ul>
            
        </div>
    );
};

export default Categories;
