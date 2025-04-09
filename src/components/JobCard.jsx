import { api } from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

const JobCard = ({ job, fetchJobs }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${job._id}`);
      fetchJobs();
      toast.success("Job deleted successfully.");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job.");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await api.patch(`/jobs/${job._id}`, { ...job, status: e.target.value });
      fetchJobs();
      toast.success("Status updated.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.company}</h3>
        <p><strong>Role:</strong> {job.role}</p>
        <p><strong>Date:</strong> {new Date(job.appliedDate).toLocaleDateString()}</p>
        {job.link && (
          <p>
            <strong>Link:</strong>{" "}
            <a href={job.link} target="_blank" rel="noreferrer">View</a>
          </p>
        )}
      </div>

      <div className="job-actions">
        <select value={job.status} onChange={handleStatusChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default JobCard;