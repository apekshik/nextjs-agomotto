// app/dashboard/components/StatusCard.tsx
import React from 'react';
import styles from '../dashboard.module.css';

// type StatusCardProps = {
//   serviceName?: string;
//   status?: string;
// };
interface StatusCardProps {
  serviceName: string;
  status: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ serviceName, status }) => (
  <div className={styles.statusCard}>
    <h3>{serviceName}</h3>
    <span>{status}</span>
  </div>
);

export default StatusCard;
