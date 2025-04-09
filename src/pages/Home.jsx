import { useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [trigger, setTrigger] = useState(false);

  const fetchJobs = () => {
    setTrigger(!trigger);
  };

  return (
    <div className="container">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1>🎯 Student Job Tracker</h1>
      <JobForm fetchJobs={fetchJobs} />
      <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid #ccc" }} />
      <JobList fetchTrigger={trigger} />
    </div>
  );
};

export default Home;