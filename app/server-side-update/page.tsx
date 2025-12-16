import styles from "../page.module.css";
import { DndServer, DndServerWithError } from "../_components/dnd-server";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndServer />
        <DndServerWithError />
      </main>
    </div>
  );
}
