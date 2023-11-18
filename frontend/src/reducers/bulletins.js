import {
    HEADER_IMAGE_URL,
    HEADER_DATE,
    HEADER_DELETE_IMAGE_URL,
    CLEAR_REDUX_STORE,

    HEADER_TITLE,
    SET_TODO_LIST,
    SET_DETAILED_TODO_LIST,
    SET_SECTION_IMAGE_UPLOAD,
    SET_SMALL_SECTION_DATA,
    DELETE_IMAGE_URL,
    SAVE_BULLETIN_SUCCESS,
    SET_CURRENT_TODOLIST,
    SET_DELTE_AFTER_TODOLIST,
  } from "../actions/types";

const initialState = {

    header_date: '',
    header_title: '',
    header_imageurl: '',
    bulletein_id: '',

    todoList: [],

    save_success: false,

};

function bulletinsReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CLEAR_REDUX_STORE:
          return {
            ...state,
            header_date: '',
            header_title: '',
            header_imageurl: '',
            bulletein_id: '',
            todoList: [],
          }
        case HEADER_DATE:
          return{
            ...state,
            header_date: payload,
          }
        case HEADER_IMAGE_URL:
          return {
            ...state,
            header_imageurl: payload
          }
        case HEADER_TITLE:
          return {
            ...state,
            header_title: payload
          }
        
        case HEADER_DELETE_IMAGE_URL:{
          return {
            ...state,
            header_imageurl:''
          }
        }
          
        case SET_TODO_LIST:
          return{
            ...state,
            todoList: payload,
          }

        case SET_DETAILED_TODO_LIST:
          let {id, data} = payload;
          let index = state.todoList.findIndex(item => item.id === id);
          let updatedValue = {
            id,
            type: "Add Section",
            data,
          }
          let updatedArray = [...state.todoList.slice(0, index), updatedValue, ...state.todoList.slice(index + 1)];
          return{
            ...state,
            todoList: updatedArray
          }
        case SET_SECTION_IMAGE_UPLOAD:
          let section_index = state.todoList.findIndex(item => item.id === payload.sectionId);
          let image_index = state.todoList[section_index].data.findIndex(item => item.id === payload.id);
          if (payload.fileType === "image"){
            let updated_imagedata = {
              id: payload.id,
              type: "gallery",
              value: payload.imageUrl,
            }
            let updatedSectionArray = [...state.todoList[section_index].data.slice(0, image_index), updated_imagedata, ...state.todoList[section_index].data.slice(image_index + 1)];

            let image_updatedValue = {
              id: payload.sectionId,
              type: "Add Section",
              data: updatedSectionArray
            }
  
            let finalUpdateArray = [...state.todoList.slice(0, section_index), image_updatedValue, ...state.todoList.slice(section_index + 1)];
            return {
              ...state,
              todoList: finalUpdateArray
            }
          }
          
          else{
            let updated_imagedata = {
              id: payload.id,
              type: "attach",
              value: payload.returnUrl,
            }
            let updatedSectionArray = [...state.todoList[section_index].data.slice(0, image_index), updated_imagedata, ...state.todoList[section_index].data.slice(image_index + 1)];

            let image_updatedValue = {
              id: payload.sectionId,
              type: "Add Section",
              data: updatedSectionArray
            }
  
            let finalUpdateArray = [...state.todoList.slice(0, section_index), image_updatedValue, ...state.todoList.slice(section_index + 1)];
            return {
              ...state,
              todoList: finalUpdateArray
            }
          }
        
        case SET_SMALL_SECTION_DATA:
          let smallsection_index = state.todoList.findIndex(item => item.id === payload.id);
          let dataTypeIndex = state.todoList[smallsection_index].data.findIndex(item => item.dataType === payload.dataType);
          let tempNewData = {
            dataType: payload.dataType,
            value: payload.value
          }
          let tempData;
          if(dataTypeIndex === -1){
            tempData = [...state.todoList[smallsection_index].data, tempNewData];
          }
          else{
            tempData = [
              ...state.todoList[smallsection_index].data.slice(0, dataTypeIndex),
              tempNewData,
              ...state.todoList[smallsection_index].data.slice(dataTypeIndex + 1)
            ]
          }
          
          let smallsection_updatedValue = {
            id: payload.id,
            type: payload.category,
            data: tempData
          }

          let updatedToDoList = [
            ...state.todoList.slice(0, smallsection_index),
            smallsection_updatedValue,
            ...state.todoList.slice(smallsection_index + 1)
          ]
          
          return {
            ...state,
            todoList: updatedToDoList
          }

        case DELETE_IMAGE_URL:
          let image_id = payload.id;
          let image_index_ = state.todoList.findIndex(item => item.id === image_id);
          let image_updatedArray = state.todoList[image_index_].data.filter(item => item.dataType !== "imageUrl");
          let tempObj = {
            id: image_id,
            type: payload.category,
            data: image_updatedArray,
          }

          let updated_deleteImageUrl = [
            ...state.todoList.slice(0, image_index_),
            tempObj,
            ...state.todoList.slice(image_index_ + 1)
          ]

          return {
            ...state,
            todoList: updated_deleteImageUrl
          }
        
        case SAVE_BULLETIN_SUCCESS:
          return{
            ...state,
            save_success: true,
          }
        case SET_CURRENT_TODOLIST:
          const {header_date, header_imageurl, header_title, todoList} = payload; 
          return {
            ...state,
            header_date,
            header_imageurl,
            header_title,
            todoList,
            bulletein_id: payload._id
          }
        case SET_DELTE_AFTER_TODOLIST:
          let {list} = payload;
          let section_id = payload.id
          let section_Index = state.todoList.findIndex(item => item.id === section_id);
          let updatedSectionValue = {
            id: section_id,
            type: "Add Section",
            data: list
          }

          let updatedSectionTodoList = [
            ...state.todoList.slice(0, section_Index),
            updatedSectionValue,
            ...state.todoList.slice(section_Index + 1)
          ]
          return {
            ...state,
            todoList: updatedSectionTodoList
          }

        default:
          return state;
      }
}

export default bulletinsReducer;