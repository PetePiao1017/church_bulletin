import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from 'react-redux';
import { isEmpty} from "lodash";
import { v4 as uuidv6 } from 'uuid';
import { Toolbar } from '../../components';


import { DeleteFilled } from "@ant-design/icons";
import * as S from "./Styles";
import "./Bulletins.css"
import AddSectionList from "../AddSectionList/AddSectionList";

import { setTodoList } from "../../actions/bulletins";


const BulletIns = (props) => {

    const [clicked, setClicked] = useState("");


    useEffect(() => {
      let index = props.todoList.findIndex(item => item.id === props.bulletInOneItem.id);
      if( !isEmpty(props.bulletInOneItem) && index === -1 ) props.setTodoList([...props.todoList, props.bulletInOneItem]);
    },[props.bulletInOneItem])


    const handleGetListWithSetter = (listName) => {
        switch (listName) {
          case "todoList":
            return { list: props.todoList, setList: props.setTodoList };
        }
    };


    const handleOnDragEnd = (result) => {
        const { source, destination } = result;
        console.log(result)
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
        console.log("abcdefg")
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
        width: "98%",
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

    const showTitle = (type,id) => {
      if(props.todoList){
        let index = props.todoList.findIndex(item => item.id === id);
        if (index !== -1){
          let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
          if(title_index === -1) return type
          else return props.todoList[index].data[title_index].value;
        }
        else return type
      }
      return type;
      
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
                        <DeleteFilled 
                          className="delete-icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            let temp = props.todoList.filter(element => element.id !== item.id);
                            props.setTodoList(temp)
                          }}
                        />
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
          <DragDropContext 
            onDragEnd={handleOnDragEnd}
          > 
            {createDroppable("todoList", props.todoList)}
          </DragDropContext>
        </S.ListWrapper>
    );
    
}

const mapStateToProps = (state) => ({
  todoList: state.builletins.todoList,
})

export default connect(mapStateToProps, {setTodoList})(BulletIns)