'use client'
import { useState, useEffect, useCallback} from 'react';
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Results from "../ui/dashboard/results/results";

const Dashboard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Cloud Storage",
      connectionStatus: false,
    },
    {
      id: 2,
      title: "Firestore",
      connectionStatus: false,
    },
  ]);

  const updateCardStatus = useCallback((index, status) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index].connectionStatus = status;
      return newCards;
    });
  }, []);

  const loadPage = useCallback(async () => {
    try {
      const res = await fetch('api/dashboard', { method: "GET" });
      // const res = await fetch('api/dashboard', { method: "GET" });
      const { firestoreStatus, googleCloudStorageStatus } = await res.json();

      updateCardStatus(0, firestoreStatus);
      updateCardStatus(1, googleCloudStorageStatus);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, [updateCardStatus]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Results />
      </div>
    </div>
  );
};

export default Dashboard;
