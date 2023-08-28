import React, { useState } from 'react';
import './Table.css';

interface TableProps {
  data: any[];
  headers: string[];
}

const Table: React.FC<TableProps> = ({ data, headers }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortType, setSortType] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const showPagination = totalPages > 1;

  const toggleHighlight = () => {
    setIsHighlighted(prevState => !prevState);
  };

  const handlePrevClick = () => {
    if (startIndex >= itemsPerPage) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleNextClick = () => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setStartIndex(0);
  };

  const handleHeaderClick = (header: string) => {
    if (sortColumn === header) {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType('asc');
      setSortColumn(header);
    }
  };

  const sortedData = [...currentData].sort((a, b) => {
    if (sortType === 'asc') {
      if (sortColumn === 'name') {
        return a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return a[sortColumn] - b[sortColumn];
      }
    } else if (sortType === 'desc') {
      if (sortColumn === 'name') {
        return b[sortColumn].localeCompare(a[sortColumn]);
      } else {
        return b[sortColumn] - a[sortColumn];
      }
    }
    return 0;
  });

  return (
    <div className="table-container">
      <div className="table-header">
        {headers.map(header => (
          <div key={header} className="header-cell" onClick={() => handleHeaderClick(header)}>
            {header}
            {sortColumn === header && (
              <span className={`sort-icon ${sortType}`}></span>
            )}
          </div>
        ))}
      </div>
      <div className="table-body">
        {sortedData.map((item, index) => (
          <div key={index} className="row">
            {headers.map(header => (
              <div
                className={`${isHighlighted ? 'highlighted' : 'body-cell'}`}
                key={header}
                onClick={toggleHighlight}
              >
                {typeof item[header] === 'object' ? (
                  Object.values(item[header]).join(', ')
                ) : (
                  item[header]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {showPagination && (
        <div className="pagination">
          <button onClick={handlePrevClick} disabled={startIndex === 0}>
            Prev
          </button>
          <span>{`${startIndex / itemsPerPage + 1}/${totalPages}`}</span>
          <button onClick={handleNextClick} disabled={startIndex + itemsPerPage >= data.length}>
            Next
          </button>
        </div>
      )}
      <div className="items-per-page">
        Items per page:
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Table;