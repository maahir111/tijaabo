import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './config';

function AddProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.link);
        setCurrentImageUrl(data.image);
      } else {
        setError(data.message || "Failed to fetch project");
      }
    } catch (error) {
      setError("Error fetching project details");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // File size check
  if (file.size > MAX_FILE_SIZE) {
    setError("File size should be less than 5MB");
    return;
  }

  // File type check
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    setError("Only JPG, PNG and GIF files are allowed");
    return;
  }

  // Success
  setImage(file);
  setCurrentImageUrl(URL.createObjectURL(file)); // preview
  setError("");
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    } else if (currentImageUrl && !image) {
      formData.append("image", currentImageUrl);
    }

    const token = localStorage.getItem('adminToken');
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_BASE_URL}/api/projects/${id}` : `${API_BASE_URL}/api/projects`;

    try {
      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Project ${id ? "updated" : "added"} successfully!`);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to save project. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Project" : "Add New Project"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-2">Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
          {currentImageUrl && (
            <img
              src={currentImageUrl}
              alt="Current"
              className="mt-2 max-w-xs"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {id ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
}

export default AddProjectPage;
