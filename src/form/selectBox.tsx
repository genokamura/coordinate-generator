import React from 'react';

type option = {
  value: string;
  label: string;
};

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: option[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, onChange, options }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
