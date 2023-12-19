import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from 'react-redux';
import { isEmpty} from "lodash";
import { v4 as uuidv6 } from 'uuid';
import { Toolbar, Group } from '../../components';
import { Dropdown,Checkbox,notification} from "antd";
import { DeleteFilled } from "@ant-design/icons";
import * as S from "./Styles";
import "./Bulletins.css"
import AddSectionList from "../AddSectionList/AddSectionList";

import { setTodoList } from "../../actions/bulletins";
import { fetchUserData, givePermission } from "../../actions/auth";


const BulletIns = (props) => {

    const [clicked, setClicked] = useState("");
    const [admin, setAdmin] = useState(false);
    const [editable, setEditable] = useState([]);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: 'Success',
        description:
          'You have succesfully gave permission.',
      });
    };
    // Functions for popup
    const [items, setItems] = useState([]);

    const onCheckboxChange = (e, userid, sectionId) => {
      props.givePermission(e.target.checked, userid, sectionId)
        .then(data => {
          if(data === "success"){
            openNotificationWithIcon("success");
          }
        })
    }
    // 
    useEffect(() => {
      let index = props.todoList.findIndex(item => item.id === props.bulletInOneItem.id);
      if( !isEmpty(props.bulletInOneItem) && index === -1 ) props.setTodoList([...props.todoList, props.bulletInOneItem]);
    },[props.bulletInOneItem])


    useEffect(() => {
      props.fetchUserData();
      setItems([]);
    },[]);

    useEffect(() => {
      if(props.auth){
        setAdmin(props.auth.admin);
        setEditable(props.auth.editableSections);
      }
    },[props.auth])

    useEffect(() => {
      if(props.admins.length !== 0) {
        setItems(props.admins);
      }
    },[props.admins])

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
        width: "100%",
    });

    const checkExistence = (editable, id) => {
      let index = editable.indexOf(id);
      if(index !== -1) return true;
      else return false;
    }


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
        switch(item.type){
          case "Add Section":
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
            </Draggable>)
          case "add_group":
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
                      <Group />
                    </div>
                )}
            </Draggable>
              
            )
          default:
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
                        onClick={() => {
                          if( admin || checkExistence(editable, item.id)){
                            props.setEditingpanelCallback(item)
                          }
                        }}
                        style = {
                          props.bulletins.section_backgorund.includes("#") 
                          ? { 
                              background : props.bulletins.section_backgorund,
                              fontSize:"10px",
                              color:"black",
                              display:"flex", 
                              justifyContent:"space-between",
                            } 
                          : { 
                              backgroundImage : 'url(' + props.bulletins.section_backgorund + ')',
                              fontSize:"10px",
                              color:"black",
                              display:"flex", 
                              justifyContent:"space-between",
                            }
                        }
                    >
                        <p className="bulletin-title" style={{color: props.bulletins.title_text}}>
                          {
                            showTitle(item.type, item.id)
                          }
                        </p>
                        {
                          checkExistence(editable, item.id) || admin
                          ?
                            <div className="icon-group">
                              <Dropdown
                                dropdownRender={() => (
                                  <div>
                                    {items.map(item1 => 
                                      <div style={{backgroundColor: "white", padding: '10px'}}>
                                        <div 
                                          style={{
                                            display: "flex", 
                                            justifyContent: "space-between",
                                            borderColor: "red"
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <p>
                                            {item1.name}
                                          </p>
                                          <Checkbox
                                            defaultChecked = {checkExistence(item1.editable, item.id)}
                                            onChange={(e) =>onCheckboxChange(e, item1.id, item.id)} 
                                            style={{marginLeft: "10px"}} 
                                          />
                                        </div>
                                      </div>  
                                    )}
                                  </div>
                                )}
                                trigger={['click']}
                              >
                                  <img 
                                    src="/invite.png" 
                                    className="invite_icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  />
                              </Dropdown>
                            <DeleteFilled 
                              className="delete-icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                let temp = props.todoList.filter(element => element.id !== item.id);
                                props.setTodoList(temp)
                              }}
                            />
                          </div>
                          :
                          <>
                            <img src = "./lock.png" style={{width: "20px"}}/>
                          </>

                        }
                        
                    </div>
                </div>
                )}
              </Draggable>
            )

        }
        // if(item.type === "Add Section"){
        //   return(
            
        // )
        // }
        // else{
        //   return (
        //     <Draggable
        //         key={item.id} 
        //         draggableId={item.id} 
        //         index={index}
        //     >
        //         {(provided, snapshot) => (
        //             <div
        //                 {...provided.draggableProps}
        //                 ref={provided.innerRef}
        //                 {...provided.dragHandleProps}
        //                 style={
        //                     getItemStyle(
        //                     snapshot.isDragging,
        //                     provided.draggableProps.style
        //                     )
        //                 }
        //             >
        //             <div className="list"
        //                 onClick={() => {
        //                   if( admin || checkExistence(editable, item.id)){
        //                     props.setEditingpanelCallback(item)
        //                   }
        //                 }}
        //                 style = {
        //                   props.bulletins.section_backgorund.includes("#") 
        //                   ? { 
        //                       background : props.bulletins.section_backgorund,
        //                       fontSize:"10px",
        //                       color:"black",
        //                       display:"flex", 
        //                       justifyContent:"space-between",
        //                     } 
        //                   : { 
        //                       backgroundImage : 'url(' + props.bulletins.section_backgorund + ')',
        //                       fontSize:"10px",
        //                       color:"black",
        //                       display:"flex", 
        //                       justifyContent:"space-between",
        //                     }
        //                 }
        //             >
        //                 <p className="bulletin-title" style={{color: props.bulletins.title_text}}>
        //                   {
        //                     showTitle(item.type, item.id)
        //                   }
        //                 </p>
        //                 {
        //                   checkExistence(editable, item.id) || admin
        //                   ?
        //                     <div className="icon-group">
        //                       <Dropdown
        //                         dropdownRender={() => (
        //                           <div>
        //                             {items.map(item1 => 
        //                               <div style={{backgroundColor: "white", padding: '10px'}}>
        //                                 <div 
        //                                   style={{
        //                                     display: "flex", 
        //                                     justifyContent: "space-between",
        //                                     borderColor: "red"
        //                                   }}
        //                                   onClick={(e) => e.stopPropagation()}
        //                                 >
        //                                   <p>
        //                                     {item1.name}
        //                                   </p>
        //                                   <Checkbox
        //                                     defaultChecked = {checkExistence(item1.editable, item.id)}
        //                                     onChange={(e) =>onCheckboxChange(e, item1.id, item.id)} 
        //                                     style={{marginLeft: "10px"}} 
        //                                   />
        //                                 </div>
        //                               </div>  
        //                             )}
        //                           </div>
        //                         )}
        //                         trigger={['click']}
        //                       >
        //                           <img 
        //                             src="/invite.png" 
        //                             className="invite_icon"
        //                             onClick={(e) => {
        //                               e.stopPropagation();
        //                             }}
        //                           />
        //                       </Dropdown>
        //                     <DeleteFilled 
        //                       className="delete-icon" 
        //                       onClick={(e) => {
        //                         e.stopPropagation();
        //                         let temp = props.todoList.filter(element => element.id !== item.id);
        //                         props.setTodoList(temp)
        //                       }}
        //                     />
        //                   </div>
        //                   :
        //                   <>
        //                     <img src = "./lock.png" style={{width: "20px"}}/>
        //                   </>

        //                 }
                        
        //             </div>
        //         </div>
        //         )}
        //     </Draggable>
        //     );
        // }
      })
    }

    return (
        <S.ListWrapper>
          {contextHolder}
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
  admins: state.builletins.admins,
  auth: state.auth.user,
  bulletins: state.builletins
})

export default connect(
  mapStateToProps, 
  {
    setTodoList, 
    fetchUserData, 
    givePermission
  })(BulletIns)