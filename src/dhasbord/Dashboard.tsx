import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from './config';

type ProjectType = {
  _id: string;
  image: string;
  title: string;
  description: string;
  link: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      } else {
        console.error("Failed to fetch projects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert("Project deleted successfully!");
          fetchProjects(); // Refresh the list
        } else {
          const data = await response.json();
          alert(`Error: ${data.message || "Something went wrong"}`);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  const handleEditProject = (id: string) => {
    navigate(`/admin/edit-project/${id}`);
  };

  return (
    <main className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PROJECTS</h1>
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-4 py-2 pl-10 rounded-full border border-blue-300 focus:outline-none"
          />
          <FaSearch className="absolute top-2.5 left-3 text-blue-400" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            <img src={`${API_BASE_URL}${project.image}`} alt={project.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm text-blue-600 mt-2 line-clamp-3">
                {project.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => window.open(project.link, '_blank')} className="text-xs border px-2 py-1 rounded hover:bg-blue-100">
                  Learn More
                </button>
                {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {project.status}
                </span> */}
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow flex space-x-2">
              <FaEdit className="w-4 h-4 text-blue-600 cursor-pointer" onClick={() => handleEditProject(project._id)} />
              <FaTrash className="w-4 h-4 text-red-600 cursor-pointer" onClick={() => handleDeleteProject(project._id)} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}