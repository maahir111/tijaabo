import React, { useState, useEffect } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from './config';

function AddTestimonialPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchTestimonial = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (response.ok) {
            setFullName(data.fullName);
            setSubject(data.subject);
            setText(data.text);
            setRating(data.rating);
            setCurrentImageUrl(data.image);
          } else {
            console.error("Failed to fetch testimonial:", data.message);
            alert("Failed to load testimonial for editing.");
            navigate("/messages");
          }
        } catch (error) {
          console.error("Error fetching testimonial:", error);
          alert("Error loading testimonial for editing.");
          navigate("/messages");
        }
      };
      fetchTestimonial();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const token = localStorage.getItem('adminToken');
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
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
      console.error("Error submitting form:", error);
      alert(`Failed to ${id ? "update" : "add"} testimonial. Please try again.`);
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
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-none space-y-8 border border-blue-200 mx-auto"
      >
        <div>
          <label htmlFor="fullName" className="block text-blue-800 text-lg font-semibold mb-3">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm"
            placeholder="Full Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-blue-800 text-lg font-semibold mb-3">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm"
            placeholder="Subject"
            value={subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-blue-800 text-lg font-semibold mb-3">
            Enter Text
          </label>
          <textarea
            id="text"
            className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 h-48 resize-y transition-all duration-300 shadow-sm"
            placeholder="Enter Text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-blue-800 text-lg font-semibold mb-3">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <FaStar
                  key={i}
                  className={`w-8 h-8 cursor-pointer ${ratingValue <= rating ? "text-blue-600" : "text-blue-300"}`}
                  onClick={() => setRating(ratingValue)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-blue-800 text-lg font-semibold mb-3">
            Choose Image
          </label>
          <div className="flex items-center space-x-5">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("image") as HTMLInputElement | null;
                if (input) input.click();
              }}
              className="flex items-center justify-center px-6 py-3 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
            >
              <FaPlus className="mr-2 text-blue-600" /> CHOOSE IMAGE
            </button>
            {image && <span className="text-blue-700 font-medium text-base">{image.name}</span>}
            {currentImageUrl && !image && (
              <span className="text-blue-700 font-medium text-base">{currentImageUrl.split('/').pop()} (Current)</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 font-bold text-lg"
        >
          {id ? "UPDATE MESSAGE" : "ADD MESSAGE"}
        </button>
      </form>
    </div>
  );
}

export default AddTestimonialPage;