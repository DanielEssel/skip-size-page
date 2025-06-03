import React from 'react';
import { MapPin, Trash2, TruckIcon, CalendarDays, CreditCard } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
}

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
    <div className="w-full py-6 overflow-x-auto bg-white shadow-sm rounded-lg mb-8">
      <div className="flex min-w-max px-4 md:px-0 md:min-w-0 justify-between md:justify-around">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {index > 0 && (
                <div className={`absolute right-full w-12 h-0.5 -translate-y-1/2 ${
                  step.completed || step.active ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 
                ${step.active ? 'bg-green-500 text-white' : 
                  step.completed ? 'bg-green-100 text-green-700 border-2 border-green-500' : 
                  'bg-gray-100 text-gray-400 border-2 border-gray-300'}`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute left-full w-12 h-0.5 -translate-y-1/2 ${
                  steps[index + 1].completed || steps[index + 1].active ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
            <span className={`mt-2 text-xs font-medium md:text-sm ${
              step.active ? 'text-green-600' : 
              step.completed ? 'text-green-700' : 
              'text-gray-500'
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