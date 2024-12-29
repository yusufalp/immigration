let leads = []; // Temporary in-memory storage.

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(leads);
  } else if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      citizenship,
      websiteUrl,
      visaType,
      message,
      submittedDate,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !websiteUrl ||
      !visaType ||
      !message ||
      !submittedDate
    ) {
      return res.status(400).json({ error: "These fields are required." });
    }

    const newLead = {
      id: leads.length + 1,
      fullName: `${firstName} ${lastName}`,
      email,
      citizenship,
      websiteUrl,
      visaType,
      message,
      submittedDate,
      status: "PENDING",
    };

    leads.push(newLead);
    res.status(201).json(newLead);
  } else if (req.method === "PUT") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: "ID and status are required." });
    }

    const leadIndex = leads.findIndex((lead) => lead.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: "Lead not found." });
    }

    leads[leadIndex].status = status;
    res.status(200).json({ message: "Lead status updated." });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
