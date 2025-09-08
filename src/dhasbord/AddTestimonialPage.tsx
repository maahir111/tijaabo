import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "./config";

const AddTestimonialPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/api/testimonials/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFullName(data.fullName);
          setTitle(data.subject);
          setMessage(data.text);
          setRating(data.rating);
          setCurrentImageUrl(data.image);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("message", message);
    formData.append("rating", rating.toString());

    if (image) {
      formData.append("image", image);
    } else if (currentImageUrl && !image) {
      formData.append("image", currentImageUrl);
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `${API_BASE_URL}/api/testimonials/${id}`
      : `${API_BASE_URL}/api/testimonials`;

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You must be logged in as admin to perform this action.");
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Testimonial ${id ? "updated" : "added"} successfully!`);
        navigate("/admin/messages");
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(`Failed to ${id ? "update" : "add"} testimonial.`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Subject"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={5}
          required
        />
        <input
          className="border p-2 w-full"
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {currentImageUrl && !image && (
          <img src={currentImageUrl} alt="Current" className="w-32 h-32 object-cover" />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {id ? "Update" : "Add"} Testimonial
        </button>
      </form>
    </div>
  );
};

export default AddTestimonialPage;
