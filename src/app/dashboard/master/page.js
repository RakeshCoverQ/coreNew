import MasterTable from "./masterTable/page";
import styles from './master.module.css'
import MasterModules from "./masterModule/page";
export default function Master() {
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                {/* <MasterTable /> */}
                <MasterModules/>
            </div>
        </div>
    )
}
