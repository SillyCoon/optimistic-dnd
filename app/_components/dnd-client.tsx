"use client";
import { useState } from "react";
import { DndExample } from "./dnd-example";

export const DndContainer = () => {
  const [items, setItems] = useState([
    { id: "item-1", text: "Item 1" },
    { id: "item-2", text: "Item 2" },
    { id: "item-3", text: "Item 3" },
  ]);

  const handleOrderChange = async (
    newOrder: { id: string; text: string }[],
  ) => {
    // Simulate a server request with a delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems(newOrder);
        resolve();
      }, 1000);
    });
  };

  return (
    <div>
      <h1>Client State Example</h1>
      <DndExample items={items} onOrderChange={handleOrderChange} />
    </div>
  );
};

export const DndContainerWithError = () => {
  const [items] = useState([
    { id: "item-1", text: "Item 1" },
    { id: "item-2", text: "Item 2" },
    { id: "item-3", text: "Item 3" },
  ]);

  const handleOrderChange = async (
    _newOrder: { id: string; text: string }[],
  ) => {
    // Simulate a server request with a delay
    return new Promise<void>((_resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 1000);
    });
  };

  return (
    <div>
      <h1>Client State with failure</h1>
      <DndExample items={items} onOrderChange={handleOrderChange} />
    </div>
  );
};
