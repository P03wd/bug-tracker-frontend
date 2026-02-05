import axios from "axios";

const addTicket = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/tickets`,
      {
        title: "Test ticket",
        description: "Testing add ticket"
      }
    );
    alert("Ticket added successfully");
  } catch (error) {
    console.log(error);
    alert("Failed to add ticket");
  }
};
