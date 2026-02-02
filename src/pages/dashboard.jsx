import { useEffect, useState } from "react";
import Column from "../components/column";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Fetch tickets from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 ADD TICKET FUNCTION (THIS IS WHAT YOU ASKED)
  const addTicket = async () => {
    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status: "TODO",
          priority: "MEDIUM",
        }),
      });

      if (!res.ok) throw new Error("Failed to add ticket");

      const newTicket = await res.json();

      // ✅ Update UI immediately
      setTickets((prev) => [newTicket, ...prev]);

      // clear form
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add ticket");
    }
  };

  // 🔹 Group tickets for Kanban
  const todo = tickets.filter((t) => t.status === "TODO");
  const inProgress = tickets.filter((t) => t.status === "IN_PROGRESS");
  const done = tickets.filter((t) => t.status === "DONE");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bug Tracker Dashboard</h1>

      {/* ADD TICKET FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Ticket description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTicket}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Ticket
        </button>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-3 gap-4">
        <Column title="To Do" tickets={todo} />
        <Column title="In Progress" tickets={inProgress} />
        <Column title="Done" tickets={done} />
      </div>
    </div>
  );
}
