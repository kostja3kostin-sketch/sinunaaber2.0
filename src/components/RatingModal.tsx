import React, { useState } from 'react';

// Siin peab olema 'export function RatingModal', et App.tsx saaks seda korrektselt importida
export function RatingModal({ isOpen, onClose, onSubmit, targetUserName }) {
  const [rating, setRating] = useState(0);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, selectedBadges, comment });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-2">Hinda kasutajat {targetUserName}</h2>
        
        {/* Siia tuleb sinu modali sisu (tärnid, märgised, kommentaar) */}
        
        <div className="flex justify-end gap-2 mt-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Katkesta
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Saada hinnang
          </button>
        </div>
      </div>
    </div>
  );
}