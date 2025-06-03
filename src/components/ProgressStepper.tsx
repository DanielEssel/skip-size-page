import React from 'react';
import { MapPin, Trash2, TruckIcon, CalendarDays, CreditCard } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
}

// Color palette: Indigo (primary), Amber (accent), Slate (neutral)
const ProgressStepper: React.FC = () => {
  const steps: Step[] = [
    { 
      id: 'postcode', 
      label: 'Postcode', 
      icon: <MapPin className="w-5 h-5" />, 
      active: false, 
      completed: true 
    },
    { 
      id: 'waste-type', 
      label: 'Waste Type', 
      icon: <Trash2 className="w-5 h-5" />, 
      active: false, 
      completed: true 
    },
    { 
      id: 'skip', 
      label: 'Select Skip', 
      icon: <TruckIcon className="w-5 h-5" />, 
      active: true, 
      completed: false 
    },
    { 
      id: 'permit', 
      label: 'Permit Check', 
      icon: <MapPin className="w-5 h-5" />, 
      active: false, 
      completed: false 
    },
    { 
      id: 'date', 
      label: 'Choose Date', 
      icon: <CalendarDays className="w-5 h-5" />, 
      active: false, 
      completed: false 
    },
    { 
      id: 'payment', 
      label: 'Payment', 
      icon: <CreditCard className="w-5 h-5" />, 
      active: false, 
      completed: false 
    },
  ];

  return (
    <div className="w-full py-6 overflow-x-auto bg-slate-50 shadow-sm rounded-lg mb-8">
      <div className="flex min-w-max px-4 md:px-0 md:min-w-0 justify-between md:justify-around">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {index > 0 && (
                <div className={`absolute right-full w-12 h-0.5 -translate-y-1/2 ${
                  step.completed || step.active ? 'bg-indigo-500' : 'bg-slate-300'
                }`} />
              )}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 
                ${step.active ? 'bg-indigo-500 text-white border-2 border-indigo-500' : 
                  step.completed ? 'bg-amber-100 text-amber-600 border-2 border-amber-400' : 
                  'bg-slate-100 text-slate-400 border-2 border-slate-300'}`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute left-full w-12 h-0.5 -translate-y-1/2 ${
                  steps[index + 1].completed || steps[index + 1].active ? 'bg-indigo-500' : 'bg-slate-300'
                }`} />
              )}
            </div>
            <span className={`mt-2 text-xs font-medium md:text-sm ${
              step.active ? 'text-indigo-600' : 
              step.completed ? 'text-amber-600' : 
              'text-slate-500'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;