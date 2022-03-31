import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import CategorySelect from "./CategorySelect";

function NewPaperForm({ onNewPaper, categoryOptions, material }) {

  const [formData, setFormData] = useState({
    material: material,
    category: categoryOptions[0],
    imageCount: 0,
    title: "",
    author: "",
    year: null,
    publisher: "",
    isbn: "",
    geography: "",
    size: "",
    venue: "",
    hasPages: false,
    onLoan: false
  });

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/${formData.material}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPaper) => {
        onNewPaper(newPaper);
        history.push(`/paper/${newPaper.material}/${newPaper.id}`)
      });
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} >
      {/* <label>
        Type:
        <select disabled name="material" value={formData.material} onChange={handleChange} >
          <option value="Book">Book</option>
          <option value="Map">Map</option>
          <option value="Event">Event</option>
        </select>
      </label> */}
      <CategorySelect category={formData.category} onCategoryChange={handleChange} categoryOptions={categoryOptions} />
      <label>
        Title:
        <input name="title" type="text" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Author:
        <input name="author" type="text" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        Publisher:
        <input name="publisher" type="text" value={formData.publisher} onChange={handleChange} />
      </label>
      <label>
        ISBN:
        <input name="isbn" type="text" value={formData.isbn} onChange={handleChange} />
      </label>
      <label>
        Call#:
        <input name="callNum" type="text" value={formData.callNum} onChange={handleChange} />
      </label>
      <label>
        Size:
        <input name="size" type="text" value={formData.size} onChange={handleChange} />
      </label>
      <label>
        Venue:
        <input name="venue" type="text" value={formData.venue} onChange={handleChange} />
      </label>
      <button>Submit</button>
    </form>
  )
}

export default NewPaperForm