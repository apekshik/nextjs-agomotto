import React from 'react';
import { StatusCard } from './components/StatusCard';
import { ResultCard } from './components/ResultCard';
import SearchBar from "./components/SearchBar";
import styles from './dashboard.module.css';

// const DashboardPage = () => {
//   return (
//     <div className="dashboard-container">
//       <header>
//         <h1>Dashboard</h1>
//         <SearchBar />
//         {/* Other header items */}
//       </header>

//       <section className="status-section">
//         <StatusCard serviceName="Storage" status="Connected" />
//         <StatusCard serviceName="Firestore" status="Connected" />
//         {/* ... Other statuses */}
//       </section>

//       <section className="results-section">
//         <h2>Results</h2>
//         <ResultCard caption="CAPTION" time="TIME OF POST" />
//         {/* Repeat <ResultCard /> for each result */}
//       </section>

//       {/* ... Other sections as needed */}
//     </div>
//   );
// };


const Dashboard = () => {
  // Assuming you will fetch or calculate these statuses and results
  const statuses = [{ serviceName: 'Storage', status: 'Connected' }, { serviceName: 'Firestore', status: 'Connected' }];
  const results = [{ caption: 'CAPTION', time: 'TIME OF POST' }, /* ...more results */];

  return (
    <section className={styles.dashboardContainer}>
      <SearchBar />
      <div className={styles.statusCardsContainer}>
        {statuses.map((service, index) => (
          <StatusCard key={index} serviceName={service.serviceName} status={service.status} />
        ))}
      </div>
      <div className={styles.resultCardsContainer}>
        {results.map((result, index) => (
          <ResultCard key={index} caption={result.caption} time={result.time} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
