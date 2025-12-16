"use client";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import styles from "./index.module.css";
import { useId, useOptimistic, useTransition } from "react";

export function SortableItem(props: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.item}
      {...attributes}
      {...listeners}
    >
      {props.text}
    </div>
  );
}

export const DndExample = ({
  items: defaultItems,
  onOrderChange,
}: {
  items: { id: string; text: string }[];
  onOrderChange: (newOrder: { id: string; text: string }[]) => Promise<void>;
}) => {
  const [items, setItems] = useOptimistic(defaultItems);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    startTransition(async () => {
      try {
        if (active.id !== over?.id) {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over?.id);

          const newOrder = arrayMove(items, oldIndex, newIndex);
          setItems(newOrder);
          await onOrderChange(newOrder);
        }
      } catch {
        // NOTE: revert is handled by useOptimistic automatically
        console.error("Failed to update item order");
      }
    });
  }

  return (
    <DndContext id={useId()} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items}>
        <div>
          {items.map(({ id, text }) => (
            <SortableItem key={id} id={id} text={text} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
