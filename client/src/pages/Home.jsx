 import React, { useEffect, useState } from 'react';
import axios from '../api.jsx';
import JobCard from '../components/jobCard.jsx';  
import Spinner from '../components/Spinner.jsx';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState(''); // State to store the selected job type filter

  useEffect(() => {
    axios.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter jobs based on the selected job type
  const filteredJobs = filterType 
    ? jobs.filter(job => job.type === filterType) // Apply filter
    : jobs; // No filter applied, show all jobs

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <img
          src="/logo.jpg"  // Path to the logo in the public folder
          alt="Job Listings Logo"
          className="h-20 mx-auto" // Adjust height and centering of the logo
        />
      </div>
       
      <h2 className="text-3xl font-semibold text-center ">All Available Jobs</h2>
      
      {/* Dropdown for job type filter */}
      <div className="mb-6 me-6 flex justify-end">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over filtered jobs */}
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No jobs match the selected filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
