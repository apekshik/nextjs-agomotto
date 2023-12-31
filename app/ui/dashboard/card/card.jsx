import { MdDataUsage } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdDataUsage size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>
          Connection: {""}  
          <span className={item.contectionStatus == "connected" ? styles.positive : styles.negative}>{item.contectionStatus}</span>
        </span>
        <span className={styles.detail}>
          Check detail: {item.link}
        </span>
      </div>
    </div>
  );
};

export default Card;
