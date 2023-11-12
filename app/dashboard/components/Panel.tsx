import React from 'react';
import styles from '../dashboard.module.css';
import { ResultCard } from './ResultCard';

type PanelProps = {
  results?: React.ReactNode;
  onFilterClick?: React.ReactNode;
};

const Panel = ({ results, onFilterClick }:PanelProps) => {
  return (
    <div className="dashboardPanel">
      {/* <button className="filterButton" onClick={onFilterClick}>Filter</button>
      <div className="resultCardsContainer">
        {results.map((result, index) => (
          <div key={index} className="resultCard">
            <p>{result.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Panel;
