import React, { useState } from 'react';
import './Filters.css'; // Make sure to create this CSS file

const Filters = ({ onApply }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    startDateTime: '',
    endDateTime: '',
    countryCode: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onApply(filters);
    setShowFilters(false); // Hide the filter box after applying filters
  };

  return (
    <div className="filters-container">
      <button onClick={() => setShowFilters(!showFilters)} className="filter-toggle-button">
        {/* Here you can use an icon. For this example, we'll just use text */}
        <img src="/images/filter-10.svg" alt="Filter" className="filter-icon" />
      </button>
      {showFilters && (
        <div className="filters-box">
          <input
            type="text"
            name="keyword"
            placeholder="Search by Name"
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="startDateTime"
            placeholder="Start Date"
            value={filters.startDateTime}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="endDateTime"
            placeholder="End Date"
            value={filters.endDateTime}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="countryCode"
            placeholder="Country Code (CA default)"
            value={filters.countryCode}
            onChange={handleFilterChange}
          />
          {/* ... more inputs for other filters as needed */}
          <button onClick={handleApplyFilters} className="apply-filters-button">
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
