import React, { useState } from 'react'

function NewPaperForm({ onNewPaper }) {

  const blankPaper = {
    material: "Book",
    category: "Literature",
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
  };
  const [formData, setFormData] = useState(blankPaper);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/paper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPaper) => {
        onNewPaper(newPaper);
        setFormData(blankPaper);
      });
  }

  function handleChange(event) {
    console.log(formData)
    const name = event.target.name;
    const value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
    console.log(name, value);
    setFormData({ ...formData, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} >
      <label>
        Type:
        <select name="material" value={formData.material} onChange={handleChange} >
          <option value="Book">Book</option>
          <option value="Map">Map</option>
          <option value="Event">Event</option>
        </select>
      </label>
      <label>
        Category:
        <select name="category" value={formData.category} onChange={handleChange} >
          <option value="Literature">Literature</option>
          <option value="History">History</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Land">Land</option>
          <option value="Road">Road</option>
          <option value="Tourist">Tourist</option>
          <option value="Greek Latin">Greek Latin</option>
          <option value="Opera">Opera</option>
          <option value="Theatre">Theatre</option>
          <option value="Music">Music</option>
        </select>
      </label>
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