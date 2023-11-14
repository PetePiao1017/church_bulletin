import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from 'react-redux';
import { isEmpty } from "lodash";
import { v4 as uuidv6 } from 'uuid';
import { Toolbar } from '../../components';


import { RightOutlined } from "@ant-design/icons";
import * as S from "./Styles";
import "./Bulletins.css"
import AddSectionList from "../AddSectionList/AddSectionList";

import { setTodoList } from "../../actions/bulletins";


const BulletIns = (props) => {

    const [clicked, setClicked] = useState("");


    useEffect(() => {
      if( !isEmpty(props.bulletInOneItem) ) props.setTodoList([...props.todoList, props.bulletInOneItem]);
    },[props.bulletInOneItem])


    const handleGetListWithSetter = (listName) => {
        switch (listName) {
          case "todoList":
            return { list: props.todoList, setList: props.setTodoList };
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
        width: "95%",
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

    const showTitle = (type, id) => {
      let index;
      switch(type) {
        case "Announcement":
          index = props.announcement_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.announcement_title[index].str;
          }
          else{
            return "Announcement"
          }

        case "Event":
          index = props.event_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.event_title[index].str;
          }
          else{
            return "Event"
          }
        case "Order Of Service":
          index = props.orderofservice_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.orderofservice_title[index].str;
          }
          else{
            return "Order Of Service"
          }
        case "Connect Card":
          index = props.connectcard_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.connectcard_title[index].str;
          }
          else{
            return "Connect Card"
          }
        case "Online Giving":
          index = props.online_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.online_title[index].str;
          }
          else{
            return "Online Giving"
          }
        case "Video":
          index = props.video_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.video_title[index].str;
          }
          else{
            return "Video"
          }
        case "Website":
          index = props.website_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.website_title[index].str;
          }
          else{
            return "Website"
          }
        case "Prayer Request":
          index = props.prayer_title.findIndex(item => item.id === id)
          if(index !== -1){
            return props.prayer_title[index].str;
          }
          else{
            return "Prayer Request"
          }
      }
    }

    const setSectionData = (id, type) => {
      let index = props.todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id: uuidv6(),
        type,
        value: null,
      }
      const tempData = {
        id,
        type: "Add Section",
        data: [...props.todoList[index].data, updatedValue]
      }

      props.setTodoList([
        ...props.todoList.slice(0, index),
        tempData,
        ...props.todoList.slice(index + 1)]
      )
    }
    
    const createDraggable = (list) => {
      return list.map((item, index) => {
        if(item.type === "Add Section"){
          return(
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
                    <div className="editing-page" onClick = {() => setClicked(item.id)}>
                      <div className='quill-container'>
                        <AddSectionList
                          sectionId = {item.id}
                          item = {item}
                        />
                      </div>
                      {
                        clicked === item.id && props.toolbarvisible
                          ? 
                          <Toolbar
                            id = {item.id}
                            setContentValueToolbarCallback = {setSectionData}
                          /> 
                          : ""
                      }
                    </div>
                    </div>
                )}
            </Draggable>
        )
        }
        else{
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
                        <p>{
                          showTitle(item.type, item.id)
                        }</p>
                        <RightOutlined />
                    </div>
                </div>
                )}
            </Draggable>
            );
        }
      })
    }

    
    return (
        <S.ListWrapper>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {createDroppable("todoList", props.todoList)}
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
  todoList: state.builletins.todoList,
})

export default connect(mapStateToProps, {setTodoList})(BulletIns)