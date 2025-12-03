import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
const suggestions = [
  'React tutorial',
  'JavaScript basics',
  'Python programming',
  'Web development',
  'Machine learning',
  'CSS animations',
  'TypeScript guide',
  'Node.js tutorial',
];
export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/results?search_query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };
  return (
    <div className="relative flex-1 max-w-2xl">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            placeholder="Search"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-zinc-800 border border-l-0 border-zinc-700 rounded-r-full px-6 hover:bg-zinc-700"
          >
            <Search className="w-5 h-5" />
          </button>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl py-2 z-50">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-zinc-800 flex items-center gap-3"
                >
                  <Search className="w-4 h-4 text-zinc-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}