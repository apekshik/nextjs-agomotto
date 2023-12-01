'use client'
import { useState, useEffect, useCallback} from 'react';
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Results from "../ui/dashboard/results/results";

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  const loadPage = useCallback(async () => {
    try {
      const res = await fetch('api/dashboard', { method: "GET" });
      const status = await res.json();
      
      setCards(status)
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {Object.entries(cards).map(([key, value]) => (
            <Card item={value} key={key}/>
          ))}
        </div>
        <Results />
      </div>
    </div>
  );
};

export default Dashboard;
