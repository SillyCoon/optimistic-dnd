import { revalidatePath } from "next/cache";
import { DndExample } from "./dnd-example";

let itemsDb: { id: string; text: string }[] = [
  { id: "item-1", text: "Item 1" },
  { id: "item-2", text: "Item 2" },
  { id: "item-3", text: "Item 3" },
];

const updateDndOrder = async (newOrder: { id: string; text: string }[]) => {
  "use server";
  // Simulate a server request with a delay
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      itemsDb = newOrder;
      resolve();
    }, 1000);
  });
  revalidatePath("/");
};

const getItems = async () => {
  "use server";
  // Simulate a server request with a delay
  return new Promise<{ id: string; text: string }[]>((resolve) => {
    setTimeout(() => {
      resolve(itemsDb);
    }, 1000);
  });
};

export const DndServer = async () => {
  return (
    <div>
      <h1>Server state</h1>
      <DndExample items={await getItems()} onOrderChange={updateDndOrder} />
    </div>
  );
};

export const DndServerWithError = () => {
  const updateDndOrderWithError = async (
    _newOrder: { id: string; text: string }[],
  ) => {
    "use server";
    // Simulate a server request with a delay that fails
    return new Promise<void>((_resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 1000);
    });
  };

  return (
    <div>
      <h1>Server state with failure</h1>
      <DndExample items={itemsDb} onOrderChange={updateDndOrderWithError} />
    </div>
  );
};
