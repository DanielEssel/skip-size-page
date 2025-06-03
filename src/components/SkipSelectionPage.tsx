import React, { useState, useEffect } from "react";
import { fetchSkips } from "../services/api";
import { Skip } from "../types";
import ProgressStepper from "./ProgressStepper";
import SkipCard from "./SkipCard";
import FilterBar, { FilterState } from "./FilterBar";
import { ArrowRight, Loader2 } from "lucide-react";

const SkipSelectionPage: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    allowedOnRoad: null,
    priceRange: [0, 2000],
    sizeRange: [0, 100],
  });

  useEffect(() => {
    const loadSkips = async () => {
      try {
        setLoading(true);
        const data = await fetchSkips();
        const fetchedSkips = Array.isArray(data?.skips) ? data.skips : [];
        setSkips(fetchedSkips);
        if (fetchedSkips.length > 0) {
          const prices = fetchedSkips.map((skip) => skip.price);
          const sizes = fetchedSkips.map((skip) => skip.size);
          setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: [Math.min(...prices), Math.max(...prices)],
            sizeRange: [Math.min(...sizes), Math.max(...sizes)],
          }));
        }
      } catch (err) {
        setError("Failed to load skip data. Please try again later.");
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
    const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);
    alert(
      `Selected skip:\n${selectedSkip?.type} (${selectedSkip?.size} Yards)\nPrice: £${selectedSkip?.price}\nHire: ${selectedSkip?.hirePeriod}`
    );
  };

  const filteredSkips = skips.filter((skip) => {
    if (
      filters.allowedOnRoad !== null &&
      skip.allowedOnRoad !== filters.allowedOnRoad
    )
      return false;
    if (
      skip.price < filters.priceRange[0] ||
      skip.price > filters.priceRange[1]
    )
      return false;
    if (skip.size < filters.sizeRange[0] || skip.size > filters.sizeRange[1])
      return false;
    return true;
  });

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);

  function handleBack(): void {
    setSelectedSkipId(null);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-700">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-600 mt-1">
            Select the skip size that best suits your needs
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProgressStepper />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-700">
              Loading skip options...
            </span>
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
                <p className="text-amber-800">
                  No skips match your current filters. Please adjust your
                  criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSkips.map((skip) => (
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
        <div className="fixed inset-x-0 bottom-4 flex justify-center z-10 pointer-events-none">
  <div className="
      w-full max-w-xs sm:max-w-md md:max-w-lg 
      mx-2 bg-white/70 backdrop-blur-sm border border-green-200 
      rounded-xl shadow-lg p-3 flex flex-col items-center pointer-events-auto 
      transition-all duration-200
    ">
    {/* Skip Details */}
    <div className="w-full text-center mb-2">
      <div className="font-bold text-base text-green-800">{selectedSkip.type}</div>
      <div className="text-green-900 flex flex-wrap justify-center gap-2 mt-0.5 text-sm font-normal">
        <span>{selectedSkip.size} Yards</span>
        <span>· £{selectedSkip.price}</span>
        <span>· {selectedSkip.hirePeriod} Hire</span>
      </div>
    </div>
    {/* Buttons */}
    <div className="flex w-full gap-2 mt-1">
      <button
        onClick={handleBack}
        className="flex-1 px-0 py-2 rounded-lg font-medium text-base bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 shadow-sm transition"
      >
        <span className="flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </span>
      </button>
      <button
        onClick={handleContinue}
        className="flex-1 px-0 py-2 rounded-lg font-medium text-base bg-green-600 hover:bg-green-700 text-white shadow-sm transition"
      >
        <span className="flex items-center justify-center gap-1">
          Continue
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>
    </div>
  </div>
</div>
      )}
    </div>
  );
};

export default SkipSelectionPage;
