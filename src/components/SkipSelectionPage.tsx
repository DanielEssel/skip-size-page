import React, { useState, useEffect } from 'react';
import { fetchSkips } from '../services/api';
import { Skip } from '../types';
import ProgressStepper from './ProgressStepper';
import SkipCard from './SkipCard';
import FilterBar, { FilterState } from './FilterBar';
import { ArrowRight, Loader2 } from 'lucide-react';

const SkipSelectionPage: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    allowedOnRoad: null,
    priceRange: [0, 2000],
    sizeRange: [0, 100]
  });

  useEffect(() => {
    const loadSkips = async () => {
      try {
        setLoading(true);
        const data = await fetchSkips();
        const fetchedSkips = Array.isArray(data?.skips) ? data.skips : [];
        setSkips(fetchedSkips);
        if (fetchedSkips.length > 0) {
          const prices = fetchedSkips.map(skip => skip.price);
          const sizes = fetchedSkips.map(skip => skip.size);
          setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: [Math.min(...prices), Math.max(...prices)],
            sizeRange: [Math.min(...sizes), Math.max(...sizes)]
          }));
        }
      } catch (err) {
        setError('Failed to load skip data. Please try again later.');
        setSkips([]);
      } finally {
        setLoading(false);
      }
    };
    loadSkips();
  }, []);

  const handleSkipSelect = (skipId: number) => {
    setSelectedSkipId(skipId);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleContinue = () => {
    const selectedSkip = skips.find(skip => skip.id === selectedSkipId);
    alert(
      `Selected skip:\n${selectedSkip?.type} (${selectedSkip?.size} Yards)\nPrice: £${selectedSkip?.price}\nHire: ${selectedSkip?.hirePeriod}`
    );
  };

  const filteredSkips = skips.filter(skip => {
    if (filters.allowedOnRoad !== null && skip.allowedOnRoad !== filters.allowedOnRoad) return false;
    if (skip.price < filters.priceRange[0] || skip.price > filters.priceRange[1]) return false;
    if (skip.size < filters.sizeRange[0] || skip.size > filters.sizeRange[1]) return false;
    return true;
  });

  const selectedSkip = skips.find(skip => skip.id === selectedSkipId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-700">Choose Your Skip Size</h1>
          <p className="text-gray-600 mt-1">Select the skip size that best suits your needs</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProgressStepper />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-700">Loading skip options...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <FilterBar
              skips={skips}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
            {filteredSkips.length === 0 ? (
              <div className="bg-amber-50 p-6 rounded-lg text-center">
                <p className="text-amber-800">No skips match your current filters. Please adjust your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSkips.map(skip => (
                  <SkipCard
                    key={skip.id}
                    skip={skip}
                    isSelected={skip.id === selectedSkipId}
                    onSelect={handleSkipSelect}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Centered Popup Card for Continue */}
      {selectedSkip && (
        <div className="fixed left-0 right-0 bottom-0 flex justify-center z-50">
          <div className="w-full md:w-auto max-w-lg mx-4 mb-6 bg-green-700 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-4 border border-green-100">
            <div className="flex-1 text-center md:text-left">
              <div className="font-bold text-lg text-white">{selectedSkip.type}</div>
              <div className="text-white flex flex-wrap justify-center md:justify-start gap-2 mt-1">
                <span>{selectedSkip.size} Yards</span>
                <span>· £{selectedSkip.price}</span>
                <span>· {selectedSkip.hirePeriod} Hire</span>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="px-6 py-3 rounded-xl font-semibold text-lg shadow bg-gray-200 hover:bg-green-200 text-green-700 flex items-center gap-2 transition"
            >
              Continue to Next Step
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipSelectionPage;