import React from 'react';
import Select from 'react-select';
import { FaStar } from "react-icons/fa";

function Dropdown({
  currencies = [],
  currency,
  setCurrency,
  favorite,
  title = ""
}) {
  const options = currencies.map(c => ({ value: c, label: c }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f7fafc',
      borderColor: '#d1d5db',
      padding: '5px',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        borderColor: '#a0aec0'
      },
      transition: 'all 0.3s ease'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      borderRadius: '0.375rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginTop: '5px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#cbd5e0' : state.isFocused ? '#e2e8f0' : '#fff',
      color: '#1a202c',
      '&:hover': {
        backgroundColor: '#e2e8f0'
      },
      padding: '10px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#4a5568'
    })
  };

  return (
    <div>
      <label
        htmlFor={title}
        className='block text-sm font-medium text-gray-500 text-left'
      >
        {title}
      </label>
      <div className='mt-1 relative'>
        <Select 
          id={title}
          value={{ value: currency, label: currency }}
          onChange={(selectedOption) => setCurrency(selectedOption.value)}
          options={options}
          styles={customStyles}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <FaStar className={`text-yellow-400 ${favorite ? 'visible' : 'invisible'}`} />
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
