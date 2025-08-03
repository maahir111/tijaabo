import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from './config';


type Testimonial = {
  _id: string;
  fullName: string;
  subject: string;
  text: string;
  rating: number;
  image: string;
};

type Props = {
  testimonial: Testimonial;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

function TestimonialCard({ testimonial, onDelete, onEdit }: Props) {
  const { _id, fullName, subject, text, rating, image } = testimonial;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {image && (
        <img
          src={image?.startsWith('http') ? image : `${API_BASE_URL}${image}`}
          alt={fullName}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{fullName}</h3>
        <p className="text-gray-600 font-medium">{subject}</p>
        <p className="text-gray-700">{text}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-gray-600">{rating}/5</span>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onEdit(_id)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;