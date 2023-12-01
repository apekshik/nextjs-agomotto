import { MdDataUsage } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <div>
          <MdDataUsage size={24} /> 
          <span className={styles.title}> {item.databasePlatform}</span>
        </div>
        <span className={styles.number}>
          Connection to <em>{item.title}:</em> {""} <br />  
          <span className={item.connectionStatus ? styles.positive : styles.negative}>{item.connectionStatus ? "Connected" : "Not connected"}</span>
        </span>
        {item.connectionStatus && (
          <span className={styles.detail}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">Click to check out the database</a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
