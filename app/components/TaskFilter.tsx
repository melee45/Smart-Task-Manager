'use client';

interface Props {
  currentFilter: 'all' | 'active' | 'completed';
  onChange: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TaskFilter({ currentFilter, onChange }: Props) {
  const filters: Array<'all' | 'active' | 'completed'> = ['all', 'active', 'completed'];

  return (
    <div className="flex justify-center gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-3 py-1 rounded ${
            currentFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
