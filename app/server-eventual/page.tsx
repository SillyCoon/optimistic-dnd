import styles from "../page.module.css";
import { DndServerWithEventualConsistency } from "../_components/dnd-server-eventual";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
          After dropping an item, the change will be visible, but after the
          delay the change will be reverted. This simulates a scenario with read
          replicas lag.
        </p>
        <p>
          To mitigate this, optimistic updates can be combined with client-side
          state management, so that the UI remains consistent even if the server
          state is not.
        </p>

        <DndServerWithEventualConsistency />
      </main>
    </div>
  );
}
