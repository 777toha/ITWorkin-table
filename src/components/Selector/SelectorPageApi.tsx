import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/typeHook';
import { setCurrentPage } from '../../store/dataSlice/dataSlice';


interface SelectorPageApiProps {
  options: string[];
}

const SelectorPageApi: React.FC<SelectorPageApiProps> = ({ options }) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.data);

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = event.target.value;
    dispatch(setCurrentPage(newPage));
  };

  return (
    <select value={currentPage} onChange={handlePageSelect}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectorPageApi;
