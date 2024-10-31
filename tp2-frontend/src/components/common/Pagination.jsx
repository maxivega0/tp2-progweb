import React from 'react';
import { PAGE_SIZES } from '../../utils/constants';
import '../../styles/common/pagination.css';

const Pagination = ({ 
  currentPage, 
  pageSize, 
  totalRecords, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  
  return (
    <div className="pagination">
      <div className="items-per-page">
        Items por página:
        <select 
          value={pageSize} 
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="page-buttons">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
