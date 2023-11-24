import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Results from "../ui/dashboard/results/results";

const Dashboard = () => {
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
