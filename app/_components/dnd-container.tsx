"use client";
import { useState } from "react";
import { DndExample } from "./dnd-example";

export const DndContainer = () => {
  const [items, setItems] = useState([
    { id: "item-1", text: "Item 1" },
    { id: "item-2", text: "Item 2" },
    { id: "item-3", text: "Item 3" },
  ]);

  return <DndExample items={items} onOrderChange={setItems} />;
};
