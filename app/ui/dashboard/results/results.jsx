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
        <div className={styles.filter}>
          <MdOutlineFilterList />
          <select className={styles.dropdown}>
              <option value="">Filter</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
          </select>
        </div>
        {/* <div className={styles.search}>
          <MdOutlineFilterList />
          <input type="text" placeholder="Filter" className={styles.input} />
        </div> */}
      </div>
      <table className={styles.table}>
        {/* <thead>
          <tr>
            <td>Post</td>
            <td>Caption</td>
            <td>Time Of Post</td>
            <td>Status</td>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <td className={styles.image_cell}>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
              </div>
            </td>
            <td className={styles.table_cell}>
              <div className={styles.caption_time}>Caption: Fire</div>
              <div className={styles.caption_time}>Time of Post: 14.02.2024</div>
            </td>
            <td className={styles.status_cell}>
              <span className={`${styles.table_cell} ${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.image_cell}>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
              </div>
            </td>
            <td className={styles.table_cell}>
              <div className={styles.caption_time}>Caption: Fire</div>
              <div className={styles.caption_time}>Time of Post: 14.02.2024</div>
            </td>
            <td  className={styles.status_cell}>
              <span className={`${styles.table_cell} ${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.image_cell}>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
              </div>
            </td>
            <td className={styles.table_cell}>
              <div className={styles.caption_time}>Caption: Fire</div>
              <div className={styles.caption_time}>Time of Post: 14.02.2024</div>
            </td>
            <td className={styles.status_cell}>
              <span className={`${styles.table_cell} ${styles.status} ${styles.cancelled}`}>
                Cancelled                
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.image_cell}>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
              </div>
            </td>
            <td className={styles.table_cell}>
              <div className={styles.caption_time}>Caption: Fire</div>
              <div className={styles.caption_time}>Time of Post: 14.02.2024</div>
            </td>
            <td className={styles.status_cell}>
              <span className={`${styles.table_cell} ${styles.status} ${styles.done}`}>
                Done
              </span>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default Results;
