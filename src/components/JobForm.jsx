import { useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

const JobForm = ({ fetchJobs }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.role || !form.appliedDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await api.post("/api/jobs", form);
      fetchJobs();
      setForm({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        link: "",
      });
      toast.success("Job added successfully!");
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Failed to add job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Job Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        name="appliedDate"
        type="date"
        value={form.appliedDate}
        onChange={handleChange}
        required
      />
      <input
        name="link"
        placeholder="Application Link (Optional)"
        value={form.link}
        onChange={handleChange}
      />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
