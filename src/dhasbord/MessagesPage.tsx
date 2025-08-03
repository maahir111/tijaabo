import React, { useState, useEffect } from "react";
import { API_BASE_URL } from './config';
import TestimonialCard from './TestimonialCard';
import { Link, useNavigate } from "react-router-dom";

type TestimonialType = {
  _id: string;
  fullName: string;
  subject: string;
  text: string;
  rating: number;
  image: string;
};

export default function MessagesPage() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      } else {
        setError(data.message || "Failed to fetch testimonials");
      }
    } catch (error) {
      setError("Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setTestimonials(testimonials.filter(t => t._id !== id));
          alert("Testimonial deleted successfully!");
        } else {
          const data = await response.json();
          setError(data.message || "Failed to delete testimonial");
        }
      } catch (error) {
        setError("Error deleting testimonial");
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-testimonial/${id}`);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full flex justify-end mb-6">
        <Link
          to="/admin/add-testimonial"
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
        >
          Add Testimonial
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial._id}
            testimonial={testimonial}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}