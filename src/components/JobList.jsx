import { useEffect, useState } from "react";
import { api } from "../services/api";
import JobCard from "./JobCard";

const JobList = ({ fetchTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    console.log("Fetched jobs:", jobs);
  }, [fetchTrigger]);

  const filteredJobs = filter === "All"
    ? jobs
    : jobs.filter((job) => job.status === filter);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} fetchJobs={fetchJobs} />
        ))
      ) : (
        <p>No job applications found.</p>
      )}
    </div>
  );
};

export default JobList;
