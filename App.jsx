import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    position: "",
    strengths: "",
    weaknesses: "",
    height: "",
    weight: "",
    club: "",
    footedness: "",
    extraDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError("");

    try {
      const response = await axios.post(
        "https://football-scout-backend-1.onrender.com/api/generate-report",
        form
      );
      setReport(response.data.report);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Football Scouting Report</h1>
      <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input name="name" placeholder="Player Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
        <input name="strengths" placeholder="Strengths" value={form.strengths} onChange={handleChange} />
        <input name="weaknesses" placeholder="Weaknesses" value={form.weaknesses} onChange={handleChange} />
        <input name="height" placeholder="Height (e.g. 1.80m)" value={form.height} onChange={handleChange} />
        <input name="weight" placeholder="Weight (e.g. 75kg)" value={form.weight} onChange={handleChange} />
        <input name="club" placeholder="Current Club" value={form.club} onChange={handleChange} />
        <input name="footedness" placeholder="Footedness (e.g. Right/Left)" value={form.footedness} onChange={handleChange} />
        <textarea name="extraDetails" placeholder="Any extra details..." value={form.extraDetails} onChange={handleChange} />

        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {report && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
          <h2>Scouting Report</h2>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
}

export default App;
