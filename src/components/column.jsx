export default function Column({ title, tickets }) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="font-bold mb-4">{title}</h2>

      {tickets.map((t) => (
        <div
          key={t._id}
          className="bg-white p-3 mb-3 rounded shadow"
        >
          <h3 className="font-semibold">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.description}</p>
        </div>
      ))}
    </div>
  );
}
