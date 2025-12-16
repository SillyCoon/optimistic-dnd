import styles from "./page.module.css";
import { DndContainer } from "./_components/dnd-container";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndContainer />
      </main>
    </div>
  );
}
