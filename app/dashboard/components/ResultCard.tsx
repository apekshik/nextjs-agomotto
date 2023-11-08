import React from 'react';
import styles from '../dashboard.module.css';

type SideBarProps = {
    caption?: React.ReactNode;
    time?: React.ReactNode;
};
export const ResultCard = ({ caption, time }:SideBarProps) => (
    <div className={styles.resultCard}>
      <p>{caption}</p>
      <time>{time}</time>
    </div>
  );

export default ResultCard;
