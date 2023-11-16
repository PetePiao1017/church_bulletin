import { 
    HEADER_TITLE,
    HEADER_DATE,
    HEADER_DELETE_IMAGE_URL,
    CLEAR_REDUX_STORE,
    RETRIEVE_DATA,
    HEADER_IMAGE_URL,

    SAVE_BULLETIN_SUCCESS,

    SET_TODO_LIST,
    SET_DETAILED_TODO_LIST,
    SET_SECTION_IMAGE_UPLOAD,
    SET_SMALL_SECTION_DATA,
    DELETE_IMAGE_URL,
} from './types';

import axios from 'axios';
import api from '../utils/api';

const uploadApi = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
});

// Todo list for section
export const setTodoList = (data) => async (dispatch) => {
    dispatch({
        type: SET_TODO_LIST,
        payload: data
    })
}

// Todo list for detailed element section
export const setDetailedTodoList = (id,data) => async (dispatch) => {
    dispatch({
        type: SET_DETAILED_TODO_LIST,
        payload: {id, data}
    })
}

// GET BULLETIN
export const getBulletins = (userid) =>  async (dispatch) => {
    let res = await api.post('/bulletins/retrieve', {userid});
    dispatch({
        type: RETRIEVE_DATA,
        payload: res.data
    })
}

// CLEAR REDUX STORE WHEN USER LOGS IN
export const clearReduxStore = () => async (dispatch) => {
    dispatch({
        type: CLEAR_REDUX_STORE,
        payload: null
    })
}


// SET SECTION IMAGE
export const setSectionImageUpload = (id, sectionId, file, fileType) => async (dispatch) => {
    let formData = new FormData();
    if(fileType === "image"){
        formData.append("file", file);
        let imageUrl = (await uploadApi.post('/upload', formData)).data;
        dispatch({
            type: SET_SECTION_IMAGE_UPLOAD,
            payload: {id, sectionId, imageUrl, fileType}
        })
    }
    else{
        formData.append("file", file);
        let returnUrl = (await uploadApi.post('/upload', formData)).data;
        dispatch({
            type: SET_SECTION_IMAGE_UPLOAD,
            payload: {id, sectionId, returnUrl, fileType}

        })
    }
}

export const setSmallSectionData = (id, category, dataType, value) => async (dispatch) => {
    dispatch({
        type: SET_SMALL_SECTION_DATA,
        payload: {id, category, dataType, value}
    })
}

// CREATE NEW BULLETIN
export const createNewBulletin = (bulletins, userId) => async (dispatch) => {
    let res = await api.post('/bulletins/new', {bulletins, userId});
    if(res.data.success){
        dispatch({
            type: SAVE_BULLETIN_SUCCESS,
        })
    }
} 

// HEADER
export const setHeaderTitle = (text) => async (dispatch) => {
    dispatch({
        type: HEADER_TITLE,
        payload: text,
    })
}

export const setHeaderDate = (text) => async (dispatch) => {
    dispatch({
        type: HEADER_DATE,
        payload: text,
    })
}

export const setHeaderImageurl = (file) => async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    let imageUrl = (await uploadApi.post('/upload', formData)).data;
    dispatch({
        type: HEADER_IMAGE_URL,
        payload: imageUrl
    })
}

export const setHeaderDeleteImageurl = (text, imageUrl) => async (dispatch) => {
    api.post('/upload/del', {imageUrl: imageUrl});
    dispatch({
        type: HEADER_DELETE_IMAGE_URL,
        payload: text
    })
}


export const setImageUrl = (file, id, category, dataType) => async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    
    let imageUrl = (await uploadApi.post('/upload', formData)).data;

    let tempObj = {
        id: id,
        category,
        dataType,
        value: imageUrl
    }

    dispatch({
        type: SET_SMALL_SECTION_DATA,
        payload: tempObj
    })
}

export const setDeleteImageUrl = (id, category, dataType, imageUrl) => async (dispatch) => {
    api.post('/upload/del', {imageUrl: imageUrl.value});
    dispatch({
        type: DELETE_IMAGE_URL,
        payload: {id, category}
    })
}
