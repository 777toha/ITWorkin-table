import React from 'react';
import { useAppSelector } from '../../store/typeHook';

interface SelectorApiProps {
  options: string[];
  onSelect: (value: string) => void;
}

const SelectorApi: React.FC<SelectorApiProps> = ({ options, onSelect }) => {
    const { selectedApi } = useAppSelector((state) => state.data);
  return (
    <select value={selectedApi} onChange={event => onSelect(event.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectorApi;
