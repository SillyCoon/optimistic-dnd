import styles from "./page.module.css";
import {
  DndContainer,
  DndContainerWithError,
} from "./_components/dnd-container";
import { DndServer } from "./_components/dnd-server";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndContainer />
        <DndContainerWithError />
        <DndServer />
      </main>
    </div>
  );
}
