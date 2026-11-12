import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (listing: any) => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Vaja abi');
  const [conditions, setConditions] = useState('Tasuta abi');
  const [serviceType, setServiceType] = useState('Muru niitmine'); // Vaikimisi teenuse tüüp
  const [city, setCity] = useState('Tallinn');
  const [district, setDistrict] = useState('Lasnamäe');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Palun sisesta pealkiri!');
      return;
    }

    onAdd({
      title,
      type,
      conditions,
      serviceType, // Saadame teenuse tüübi edasi
      city,
      district,
      description,
      createdAt: new Date().toISOString(),
    });

    // Puhasta vorm ja sulge
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Uue kuulutuse lisamine
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pealkiri */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Pealkiri
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sisesta kuulutuse pealkiri"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* UUS VÄLI: Teenuse tüübi valik (Muru niitmine jne) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Teenuse / Abi tüüp
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Muru niitmine">🌱 Muru niitmine ja aiatööd</option>
              <option value="Lume lükkamine">❄️ Lume lükkamine</option>
              <option value="Kodune koristus">🧹 Kodune koristus</option>
              <option value="Ostuabi / Toidukaubad">
                🛒 Ostuabi / Toidukaubad
              </option>
              <option value="Pisiremont">🔧 Pisiremont ja meisterdamine</option>
              <option value="Transport / Kolimine">
                🚚 Transport / Kolimine
              </option>
              <option value="Lemmiklooma hooldus">
                🐾 Lemmiklooma hooldus
              </option>
              <option value="Muu abi">✨ Muu abi</option>
            </select>
          </div>

          {/* Kuulutuse tüüp ja Tingimused */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tüüp
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Vaja abi">Vaja abi</option>
                <option value="Pakun abi">Pakun abi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tingimused
              </label>
              <select
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Tasuta abi">Tasuta abi</option>
                <option value="Tasuline">Tasuline</option>
                <option value="Kokkuleppel">Kokkuleppel</option>
              </select>
            </div>
          </div>

          {/* Linn ja Piirkond */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Linn / Maakond
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Tallinn">Tallinn</option>
                <option value="Tartu">Tartu</option>
                <option value="Pärnu">Pärnu</option>
                <option value="Narva / Jõhvi">Narva / Jõhvi</option>
                <option value="Harjumaa">Harjumaa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Piirkond / Vald
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Lasnamäe">Lasnamäe</option>
                <option value="Kesklinn">Kesklinn</option>
                <option value="Mustamäe">Mustamäe</option>
                <option value="Haabersti">Haabersti</option>
                <option value="Nõmme">Nõmme</option>
              </select>
            </div>
          </div>

          {/* Kirjeldus */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Kirjeldus
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Kirjelda lähemalt oma soovi..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Nupud */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Tühista
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Avalda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
