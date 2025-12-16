import styles from "./page.module.css";
import { DndExample } from "./_components/dnd-example";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndExample />
      </main>
    </div>
  );
}
