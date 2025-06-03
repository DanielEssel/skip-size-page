import React from 'react';
import { Filter, Check } from 'lucide-react';
import { Skip } from '../types';

interface FilterBarProps {
  skips: Skip[];
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

export interface FilterState {
  allowedOnRoad: boolean | null;
  priceRange: [number, number];
  sizeRange: [number, number];
}

const FilterBar: React.FC<FilterBarProps> = ({ skips, onFilterChange, filters }) => {
  // Find min and max values for price and size
  const minPrice = Math.min(...skips.map(skip => skip.price));
  const maxPrice = Math.max(...skips.map(skip => skip.price));
  const minSize = Math.min(...skips.map(skip => skip.size));
  const maxSize = Math.max(...skips.map(skip => skip.size));
  
  const handleRoadFilterChange = (value: boolean | null) => {
    onFilterChange({
      ...filters,
      allowedOnRoad: value
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = parseInt(e.target.value);
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], newMaxPrice]
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      onFilterChange({
        ...filters,
        sizeRange: [minSize, maxSize]
      });
    } else {
      const size = parseInt(value);
      onFilterChange({
        ...filters,
        sizeRange: [size, size]
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-800">Filter Options</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Road Placement</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleRoadFilterChange(true)}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${
                filters.allowedOnRoad === true
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {filters.allowedOnRoad === true && <Check className="w-3 h-3" />}
              Road Safe
            </button>
            <button
              onClick={() => handleRoadFilterChange(false)}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${
                filters.allowedOnRoad === false
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {filters.allowedOnRoad === false && <Check className="w-3 h-3" />}
              Off Road
            </button>
            <button
              onClick={() => handleRoadFilterChange(null)}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${
                filters.allowedOnRoad === null
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {filters.allowedOnRoad === null && <Check className="w-3 h-3" />}
              All
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: £{filters.priceRange[1]}
          </label>
          <input
            id="max-price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
        </div>
        
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Skip Size</label>
          <select
            id="size"
            onChange={handleSizeChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={filters.sizeRange[0] === filters.sizeRange[1] ? filters.sizeRange[0] : 'all'}
          >
            <option value="all">All Sizes</option>
            {skips.map(skip => (
              <option key={skip.id} value={skip.size}>
                {skip.size} Yard
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;