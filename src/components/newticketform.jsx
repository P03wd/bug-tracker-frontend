// src/components/NewTicketForm.jsx
import { useState } from "react";
import axios from "axios";

export default function NewTicketForm({ onTicketAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title & description required");

    try {
      const res = await axios.post("http://localhost:5000/api/tickets", {
        title,
        description,
      });
      onTicketAdded(res.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Ticket Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
}
