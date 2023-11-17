import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import Footer from "../ui/dashboard/footer/footer"

const Dashboard = () => {
  return (
    <main>
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <div className={styles.cards}>
                        {cards.map((item) => (
                            <Card item={item} key={item.id} />
                        ))}
                        </div>
                        <Transactions />
                        <Chart />
                    </div>
                    
                </div>
                <Footer/>
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    </main>
  );
};

export default Dashboard;
