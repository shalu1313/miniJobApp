import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api.jsx';
import Spinner from '../components/Spinner.jsx';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(() => alert('Job not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!job) return <p className="text-center text-red-600 mt-10">Job not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">{job.title}</h2>
      <div className="space-y-3 text-gray-700">
        <div>
          <span className="font-semibold text-blue-700">Company:</span> {job.company}
        </div>
        <div>
          <span className="font-semibold text-blue-700">Type:</span> {job.type}
        </div>
        <div>
          <span className="font-semibold text-blue-700">Location:</span> {job.location}
        </div>
        <div>
          <h3 className="text-lg font-semibold mt-4 text-blue-700">Description:</h3>
          <p className="whitespace-pre-line mt-1 ">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
