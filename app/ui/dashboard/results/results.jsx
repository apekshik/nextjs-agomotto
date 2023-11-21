import Image from "next/image";
import styles from "./results.module.css";
import {
  MdOutlineFilterList,
} from "react-icons/md";

const Results = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h2 className={styles.title}>Results</h2>
        <div className={styles.search}>
          <MdOutlineFilterList />
          <input type="text" placeholder="Filter" className={styles.input} />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Post</td>
            <td>Caption</td>
            <td>Time Of Post</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Fire</td>
            <td>14.02.2024</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
          </tr>
          <tr className={styles.tr}>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Yikes</td>
            <td>14.02.2024</td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
          </tr>
          <tr className={styles.tr}>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>This is a caption</td>
            <td>14.02.2024</td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelled
              </span>
            </td>
          </tr>
          <tr className={styles.tr}>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Hello</td>
            <td>14.02.2024</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
