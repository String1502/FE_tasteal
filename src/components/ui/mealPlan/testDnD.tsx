import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BoxDrag({ id }: { id: string }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: {
      id: id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div role="Handle" ref={drag}>
        {id}
      </div>
    </div>
  );
}

function Bucket() {
  const [array, setArray] = useState<{ id: string }[]>([]);

  function handleChange(id: string) {
    console.log(array);

    if (array.some((item) => item.id === id)) {
      console.log("ID đã tồn tại trong array");
      return;
    } else {
      console.log("ID chưa tồn tại trong array");
      setArray((prev) => [...prev, { id }]);
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: { id: string }) => handleChange(item.id),
    canDrop: (item: { id: string }) => {
      const isIdInArray = array.some((i) => i.id === item.id);
      return !isIdInArray;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      role={"Dustbin"}
      style={{ backgroundColor: isOver ? "red" : "white" }}
    >
      {canDrop ? "Release to drop" : "Drag a box here"}
      {array.map((item) => (
        <BoxDrag key={item.id} id={item.id} />
      ))}
    </div>
  );
}

export default function TestDND() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {[{ id: "1" }, { id: "2" }, { id: "3" }].map((item) => (
          <BoxDrag key={item.id} id={item.id} />
        ))}
        <Bucket />
      </DndProvider>
    </>
  );
}
