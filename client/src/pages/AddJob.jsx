import React, { useState } from 'react';
import axios from '../api.jsx';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    type: '',
    location: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/jobs', form);
      navigate('/');
    } catch (err) {
      alert('Error adding job');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'company', 'location', 'description'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            {field === 'description' ? (
              <textarea
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <input
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
