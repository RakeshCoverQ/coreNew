import MasterTable from "./masterTable/page";
import styles from './master.module.css'
export default function Master() {
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <MasterTable />
            </div>
        </div>
    )
}
