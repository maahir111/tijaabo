import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from './config';

type Testimonial = {
  _id: string;
  fullName: string;
  title: string;
  message: string;
  rating: number;
  image: string;
};

type Props = {
  testimonial: Testimonial;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

function TestimonialCard({ testimonial, onDelete, onEdit }: Props) {
  const { _id, fullName, title, message, rating, image } = testimonial;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {image && (
        <img
          src={image.startsWith('http') ? image : `${API_BASE_URL}${image}`}
          alt={fullName || 'Testimonial Image'}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{fullName}</h3>
        <p className="text-gray-600 font-medium">{title}</p>
        <p className="text-gray-700">{message}</p>
        <div className="flex items-center">
          <span className="text-yellow-500" aria-label="Rating star">★</span>
          <span className="ml-1 text-gray-600">{rating}/5</span>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={() => onEdit(_id)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
            aria-label={`Edit testimonial by ${fullName}`}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={() => onDelete(_id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
            aria-label={`Delete testimonial by ${fullName}`}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
