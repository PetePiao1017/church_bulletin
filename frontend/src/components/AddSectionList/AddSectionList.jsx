import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from 'react-redux';
import { 
  FileUpload,
  ImageUpload,
  ButtonText,
  EventSection,
  VideoSection,
  Survey,
  Quote,
  Text,
} from '../../components';


import * as S from "./Styles";
import "./AddSectionList.scss"
import { setDetailedTodoList } from "../../actions/bulletins";

const AddSectionList= (props) => {

    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        if(props.item.data.length !== 0) setTodoList(props.item.data)
    },[props.item])


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

    const textEditer = (id, value) => {
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id,
        type: "edit",
        value: value
      }
      let tempList = [...todoList.slice(0,index), updatedValue, ...todoList.slice(index + 1)];
      setTodoList(tempList)
      props.setDetailedTodoList(props.sectionId, tempList);
    }

    const buttonEditer = (value, id) => {
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id,
        type: "cursor",
        value: value
      }
      let tempList = [...todoList.slice(0, index), updatedValue, ...todoList.slice(index + 1)];
      props.setDetailedTodoList(props.sectionId, tempList)
    }

    const eventEditer = (id, title, detail, date, month) => {
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id, 
        type: "event",
        value: {title, detail, date, month}
      }
      let tempList = [...todoList.slice(0, index), updatedValue, ...todoList.slice(index + 1)];
      props.setDetailedTodoList(props.sectionId, tempList);
    }

    const videoEditer = (id, value) => {
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id, 
        type: "event",
        value: value
      }
      let tempList = [...todoList.slice(0, index), updatedValue, ...todoList.slice(index + 1)];
      props.setDetailedTodoList(props.sectionId, tempList);
    }

    const surveyEditer = (id, title, answer1, answer2, answer3) => {
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id,
        type: "checked",
        value: {title, answer1, answer2, answer3}
      }
      let tempList = [...todoList.slice(0, index), updatedValue, ...todoList.slice(index + 1)];
      props.setDetailedTodoList(props.sectionId, tempList);
    }


    const quoteEditer = (id, content, text) =>{
      let index = todoList.findIndex(item => item.id === id);
      let updatedValue = {
        id,
        type: "quote",
        value: {content, text}
      }
      let tempList = [...todoList.slice(0, index), updatedValue, ...todoList.slice(index + 1)];
      props.setDetailedTodoList(props.sectionId, tempList);

    }
    
    const deleteItem = (id) => {
      setTodoList(todoList.filter(item => item.id !== id));
    }
    const elementBuilder = (str, id, index) => {
        switch(str){
            case "edit":
              return <Text
                        value = {todoList[index].value}
                        id = {id}
                        index = {index}
                        textEditerCallback = {textEditer}
                        deleteItemCallback = {deleteItem}
                  />
            case "gallery":
              return <ImageUpload
                        id = {id}
                        key = {index}
                        index = {"image" + id + index}
                        sectionId = {props.sectionId}
                        deleteItemCallback = {deleteItem}
                      />
            case "attach":
              return <FileUpload
                        id = {id}
                        key = {index}
                        index = {"attach" + id + index}
                        sectionId = {props.sectionId}
                        deleteItemCallback = {deleteItem}
                        />
            case "cursor":
              return <ButtonText
                          id = {id}
                          sectionId = {props.sectionId}
                          key={index}
                          index = {"cursor" + id + index}
                          buttonEditerCallback = {buttonEditer}
                          deleteItemCallback = {deleteItem}
                          />
            case "event":
              return <EventSection
                          id = {id}
                          key = {index}
                          index = {"event" + id + index}
                          eventEditerCallback = {eventEditer}
                          deleteItemCallback = {deleteItem}
                          />
            case "video":
              return <VideoSection
                        id = {id}
                        key = {index}
                        index = {"video" + id + index}
                        videoEditerCallback = {videoEditer}
                        deleteItemCallback = {deleteItem}
                        />
            case "checked":
              return <Survey
                          id = {id}
                          key = {index}
                          index = {"survey" + id + index}
                          surveyEditerCallback = {surveyEditer}
                          deleteItemCallback = {deleteItem}
                      />
            case "quote":
              return <Quote
                        id = {id}
                        key = {index}
                        index = {"quote" + id + index}
                        quoteEditerCallback = {quoteEditer}
                        deleteItemCallback = {deleteItem}
                        />
          }
    }
    const createDraggable = (list) => {
      return list.map((item, index) => {
          return(
            <Draggable
                key={item.id} 
                draggableId={item.id} 
                index={index}
                style={{width: "100%"}}
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
                   
                        { elementBuilder(item.type, item.id, index) }
                    </div>
                )}
            </Draggable>)
        })
    }

    
    return (
        <S.ListWrapper>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {createDroppable("todoList", todoList)}
          </DragDropContext>
        </S.ListWrapper>
    );
    
}

export default connect(null, {setDetailedTodoList})(AddSectionList)