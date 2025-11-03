'use client';

import { useState, FormEvent } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '../atoms';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

/**
 * SearchBar Component
 *
 * A search input with icon and location button. Handles validation
 * to ensure non-empty search queries.
 *
 * @param onSearch - Callback function when search is submitted
 * @param placeholder - Input placeholder text
 * @param loading - Whether the search bar is loading
 */
export const SearchBar = ({
  onSearch,
  loading = false,
  placeholder = 'Search for places ...',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError('Please enter a location');
      return;
    }

    if (trimmedQuery.length < 2) {
      setError('Location must be at least 2 characters');
      return;
    }

    setError('');
    onSearch(trimmedQuery);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-gray-100">
        <Search size={20} className="text-gray-400 flex-shrink-0" />
        <Input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          error={error}
        />
        <button
          disabled={loading}
          type="submit"
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Use current location"
        >
          <MapPin size={20} className="text-gray-400" />
        </button>
      </div>
    </form>
  );
};
