import React from 'react';
import { Link } from 'react-router-dom';
const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 m-4 hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-blue-700">{job.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{job.company}</p>
        <p className="text-gray-500 text-sm">{job.location}</p>
      </div>
      <p className="text-gray-700 text-sm mt-3 mb-5 line-clamp-3">{job.description}</p>

      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {job.type}
        </span>
        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-full transition duration-200">
        <Link
          to={`/job/${job._id}`} // Use Link component to navigate to the job details page
          className="hover:underline text-sm"
        >
          View Details
        </Link>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
