// src/components/TicketCard.jsx
export default function TicketCard({
  title,
  description,
  status,
  project,
  assignee,
  onStatusChange,
  _id,
}) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange({ _id, status: newStatus });
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Project: {project}</p>
      <p>Assignee: {assignee}</p>
      <select value={status} onChange={handleStatusChange}>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>
    </div>
  );
}
