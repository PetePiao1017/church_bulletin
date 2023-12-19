import React, { useState } from "react";
import { v4 as uuidv6 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Group.scss";

const Group = () => {
  const [bulletinItem, setBulletinItem] = useState([]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    margin: `0 ${grid}px 0 0`, // Adjusted margin for horizontal display
    // background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    display: "flex", // Display items in a row
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    overflowX: "auto", // Enable horizontal scrolling if needed
  });

  const onDrop = ev => {
    ev.stopPropagation();
    let type = ev.dataTransfer.getData("id");
    let group_id = ev.dataTransfer.getData("group_move");
    console.log(group_id);
    let id = uuidv6();
    let temp = {
      id,
      type,
      data: []
    };
    setBulletinItem([...bulletinItem, temp]);
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      bulletinItem,
      result.source.index,
      result.destination.index
    );

    setBulletinItem(items);
  };

  const onDragStart = (e, id) => {
    console.log(id);
    console.log(e)
  }

  return (
    <div
      className="border-box"
      onDragOver={e => {
        e.preventDefault();
      }}
      onDrop={ev => {onDrop(ev)}}
    >
      <input
        className="input-tag"
        type="text"
        placeholder="Calendarium Officium Missa"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {bulletinItem.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      draggable
                      onDragStart={(e) => onDragStart(e, "group_move")}
                    >
                      <div className="bulletin-group">
                        <img src="./edit.png" style={{ width: "20px" }} />
                        <p className="label-group">{item.type}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Group;
