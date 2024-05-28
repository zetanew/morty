import React from 'react';

interface CardProps {
  name: string;
  status: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, status, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 transform transition-transform duration-200 hover:scale-105">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Status: {status}
        </p>
      </div>
    </div>
  );
};

export default Card;
