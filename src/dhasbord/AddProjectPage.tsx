import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from './config';

function AddProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Please login first");
        navigate("/admin/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        setError("Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setLink(data.link);
      setImageUrl(data.image);
    } catch (err) {
      setError("Error fetching project details");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const token = localStorage.getItem("adminToken");
  if (!token) {
    setError("Please login first");
    navigate("/admin/login");
    setLoading(false);
    return;
  }

  const projectData = {
    title,
    description,
    link,
    image: imageUrl
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/projects${id ? `/${id}` : ''}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend error response
      throw new Error(data.error || data.message || "Something went wrong");
    }

    alert(`Project ${id ? "updated" : "added"} successfully!`);
    navigate("/admin/dashboard");
    
  } catch (err) {
    setError(err.message || "Failed to save project. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setError("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Project" : "Add New Project"}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter project description"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <img
                src={imageUrl}
                alt="Preview"
                className="max-w-xs h-auto border border-gray-300 rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : (id ? "Update Project" : "Add Project")}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectPage;