import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from './config';

function AddTestimonialPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    if (id) fetchTestimonial();
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`);
      const data = await response.json();

      if (response.ok) {
        setFullName(data.fullName);
        setSubject(data.subject);
        setText(data.text);
        setRating(data.rating);
        setCurrentImageUrl(data.image);
      } else {
        console.error("Failed to fetch:", data.message);
        alert("Failed to load testimonial.");
        navigate("/messages");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error loading testimonial.");
      navigate("/messages");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("subject", subject);
    formData.append("text", text);
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

    try {
      const response = await fetch(url, { method, body: formData });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setCurrentImageUrl("");
    }
  };

  return (
    <div className="bg-blue-50 w-full min-h-screen py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-900 text-center">
        {id ? "Edit Testimonial" : "Add New Testimonial"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl space-y-8 border border-blue-200 mx-auto"
      >
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-blue-800 text-lg font-semibold mb-3">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-blue-800 text-lg font-semibold mb-3">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Text */}
        <div>
          <label htmlFor="text" className="block text-blue-800 text-lg font-semibold mb-3">
            Message
          </label>
          <textarea
            id="text"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 transition-all resize-y"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-blue-800 text-lg font-semibold mb-3">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => {
              const value = i + 1;
              return (
                <FaStar
                  key={i}
                  className={`w-8 h-8 cursor-pointer ${value <= rating ? "text-blue-600" : "text-blue-300"}`}
                  onClick={() => setRating(value)}
                />
              );
            })}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-blue-800 text-lg font-semibold mb-3">
            Choose Image
          </label>
          <div className="flex items-center space-x-5">
            <input
              type="file"
              ref={fileInputRef}
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-6 py-3 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-100 shadow-sm"
            >
              <FaPlus className="mr-2 text-blue-600" /> CHOOSE IMAGE
            </button>
            {image && <span className="text-blue-700">{image.name}</span>}
            {!image && currentImageUrl && (
              <span className="text-blue-700">{currentImageUrl.split("/").pop()} (Current)</span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-bold text-lg"
        >
          {id ? "UPDATE MESSAGE" : "ADD MESSAGE"}
        </button>
      </form>
    </div>
  );
}

export default AddTestimonialPage;
