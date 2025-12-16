import { revalidatePath } from "next/cache";
import { DndExample } from "./dnd-example";

let itemsDb: { id: string; text: string }[] = [
  { id: "item-1", text: "Item 1" },
  { id: "item-2", text: "Item 2" },
  { id: "item-3", text: "Item 3" },
];

const updateDndOrder = async (newOrder: { id: string; text: string }[]) => {
  "use server";
  // // Simulates read replicas lag
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
    setTimeout(() => {
      itemsDb = newOrder;
    }, 1000);
  }).then(() => {
    revalidatePath("/");
  });
};

// Unsolvable using optimistic updates alone
export const DndServerWithEventualConsistency = () => {
  return (
    <div>
      <h1>Server state with eventual consistency</h1>
      <h3>Could not be solved with useOptimistic alone</h3>
      <DndExample items={itemsDb} onOrderChange={updateDndOrder} />
    </div>
  );
};
