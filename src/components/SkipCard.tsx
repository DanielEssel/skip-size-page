import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { Skip } from '../types';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: number) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative flex flex-col overflow-hidden transition-all duration-300 bg-slate-200 rounded-lg shadow-md hover:shadow-xl ${
        isSelected ? 'ring-2 ring-indigo-500 scale-[1.02]' : 'ring-1 ring-blue-400'
      }`}
    >
      <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {skip.size} Yards
      </div>
      
      {!skip.allowedOnRoad && (
        <div className="absolute top-4 left-4 z-10 bg-amber-100 text-amber-800 text-xs flex items-center gap-1 font-semibold px-2 py-1 rounded-full">
          <AlertTriangle className="w-3 h-3" />
          <span>Not Allowed On Road</span>
        </div>
      )}
      
      <div className="w-full h-48 bg-slate-100 overflow-hidden">
  <img 
    src={`/skips/${skip.size}-yard.jpg`}
    alt={`${skip.size} Yard Skip`}
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</div>
      
      <div className="flex flex-col p-5">
        <h3 className="text-xl font-bold text-slate-900">{skip.size} Yard Skip</h3>
        <p className="text-sm text-slate-600 mt-1">{skip.hirePeriod} day hire period</p>
        
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-sm text-slate-500">Price</span>
            <span className="text-2xl font-bold text-indigo-600">{skip.currency}{skip.price}</span>
          </div>
          
          <button
            onClick={() => onSelect(skip.id)}
            className={`px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
              isSelected 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-slate-100 text-slate-800 hover:bg-blue-300'
            }`}
          >
            {isSelected ? (
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> Selected
              </span>
            ) : 'Select This Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;