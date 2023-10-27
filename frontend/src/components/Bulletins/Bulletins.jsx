import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from 'react-redux';

import { RightOutlined } from "@ant-design/icons";
import * as S from "./Styles";
import "./Bulletins.scss"


const BulletIns = (props) => {

    const [todoList, setTodoList] = useState([{}]);

    useEffect(() => {
        setTodoList(props.bulletins.map((item) => {
            return {
                id: Math.random().toString(),
                content: item
            }
        }))
    },[props.bulletins])

    const handleGetListWithSetter = (listName) => {
        switch (listName) {
          case "todoList":
            return { list: todoList, setList: setTodoList };
        }
    };

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;
    
        if (!destination) return;
    
        if (source.droppableId === destination.droppableId) {
          const listDetails = handleGetListWithSetter(source.droppableId);
          const orderResult = handleReOrder(
            listDetails.list,
            source.index,
            destination.index
          );
          listDetails.setList(orderResult);
        } else {
          handleMove(
            source.droppableId,
            destination.droppableId,
            source,
            destination
          );
        }
    };

    const handleMove = (
        sourceId,
        destId,
        droppableSource,
        droppableDestination
      ) => {
        const sourceListDetails = handleGetListWithSetter(sourceId);
        const destListDetails = handleGetListWithSetter(destId);
        const sourceClone = Array.from(sourceListDetails.list);
        const destClone = Array.from(destListDetails.list);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
    
        destClone.splice(droppableDestination.index, 0, removed);
    
        sourceListDetails.setList(sourceClone);
        destListDetails.setList(destClone);
    };

    const handleReOrder = (list, sourceIndex, destinationIndex) => {
        const listClone = Array.from(list);
        const [removed] = listClone.splice(sourceIndex, 1);
        listClone.splice(destinationIndex, 0, removed);
    
        return listClone;
    };
    
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: "2px 0",
        background: "transparent",
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: "transparent",
        width: "90%",
    });


    const createDroppable = (listName, list) => {
        return (
          <S.DroppableStyle>
    
            <Droppable droppableId={listName}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDragging)}
                >
                  {createDraggable(list)}
                  {provided.placeholder}
                </div>
              )}  
            </Droppable>
          </S.DroppableStyle>
        );
    };

    const showTitle = (str) => {
      switch(str) {
        case "Announcement":
          return props.announcement_title
        case "Event":
          return props.event_title
        case "Order Of Service":
          return props.orderofservice_title
        case "Connect Card":
          return props.connectcard_title
        case "Online Giving":
          return props.online_title;
        case "Video":
          return props.video_title;
        case "Website":
          return props.website_title;
        case "Prayer Request":
          return props.prayer_title;
      }
    }

    const createDraggable = (list) => {
        return list.map((item, index) => {
            return (
            <Draggable 
                key={item.id} 
                draggableId={item.id} 
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        style={
                            getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                            )
                        }
                    >
                    <div className="list"
                        onClick={() => props.setEditingpanelCallback(item)}
                        style={{
                          fontSize:"10px", 
                          color:"black", 
                          display:"flex", 
                          justifyContent:"space-between",
                          backgroundColor: "rgb(247, 250, 252)",
                        }}
                        
                    >
                        <p>{showTitle(item.content)}</p>
                        <RightOutlined />
                    </div>
                </div>
                )}
            </Draggable>
            );
        });
    };

    
    return (
        <S.ListWrapper>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {createDroppable("todoList", todoList)}
          </DragDropContext>
        </S.ListWrapper>
    );
    
}

const mapStateToProps = (state) => ({
  announcement_title: state.builletins.announcment_Title,
  orderofservice_title : state.builletins.orderofservice_Title,
  event_title : state.builletins.event_Title,
  connectcard_title: state.builletins.connectcard_Title,
  online_title: state.builletins.online_Title,
  orderofservice_title: state.builletins.orderofservice_Title,
  prayer_title: state.builletins.prayer_Title,
  video_title: state.builletins.video_Title,
  website_title: state.builletins.website_Title,
})

export default connect(mapStateToProps)(BulletIns)