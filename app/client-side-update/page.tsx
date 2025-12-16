import styles from "../page.module.css";
import { DndContainer, DndContainerWithError } from "../_components/dnd-client";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndContainer />
        <DndContainerWithError />
      </main>
    </div>
  );
}
