// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import NewTicketForm from "./components/newticketform";
import TicketCard from "./components/ticketcard";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");
      setTickets(res.data); // store tickets in state
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketAdded = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div>
      <h1>🐛 Bug Tracker Dashboard</h1>
      <NewTicketForm onTicketAdded={handleTicketAdded} />

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found. Add one above!</p>
      ) : (
        tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            _id={ticket._id}
            title={ticket.title}
            description={ticket.description}
            status={ticket.status}
            project={ticket.project?.name || "No project"}
            assignee={ticket.assignee?.name || "Unassigned"}
            onStatusChange={(updatedTicket) => {
              setTickets(
                tickets.map((t) =>
                  t._id === updatedTicket._id ? updatedTicket : t
                )
              );
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
