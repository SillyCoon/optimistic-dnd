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
import { useId } from "react";

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
  onOrderChange: (newOrder: { id: string; text: string }[]) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = defaultItems.findIndex((item) => item.id === active.id);
      const newIndex = defaultItems.findIndex((item) => item.id === over?.id);

      const newOrder = arrayMove(defaultItems, oldIndex, newIndex);
      onOrderChange(newOrder);
    }
  }

  return (
    <DndContext id={useId()} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={defaultItems}>
        <div>
          {defaultItems.map(({ id, text }) => (
            <SortableItem key={id} id={id} text={text} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
