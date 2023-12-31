import { 
    HEADER_TITLE,
    HEADER_DATE,
    HEADER_DELETE_IMAGE_URL,
    CLEAR_REDUX_STORE,
    RETRIEVE_DATA,
    HEADER_IMAGE_URL,
    ICON_UPLOAD,
    DELETE_ICON_URL,

    SAVE_BULLETIN_SUCCESS,
    SEND_SMS,
    SET_TODO_LIST,
    SET_DETAILED_TODO_LIST,
    SET_SECTION_IMAGE_UPLOAD,
    SET_SMALL_SECTION_DATA,
    DELETE_IMAGE_URL,
    SET_CURRENT_TODOLIST,
    SET_DELTE_AFTER_TODOLIST,
    SET_PHONE_NUMBER,
    SET_DATA_SOURCE,
    SET_HEADTEXT_COLOR,
    SET_BACKGROUND_COLOR,
    SET_SECTION_BACKGROUND_COLOR,
    SET_SECTION_TITLE_COLOR,
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
export const getBulletins = () =>  async (dispatch) => {
    let res = await api.get('/bulletins/retrieve');
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
export const createNewBulletin = (bulletins, userId, access) => async (dispatch) => {
    let res = await api.post('/bulletins/new', {bulletins, userId, access});
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

    return imageUrl;
}

export const setDeleteImageUrl = (id, category, dataType, imageUrl) => async (dispatch) => {
    api.post('/upload/del', {imageUrl: imageUrl.value});
    dispatch({
        type: DELETE_IMAGE_URL,
        payload: {id, category}
    })
}


export const setCurrentTodoList = (data) =>  async (dispatch) => {
    dispatch({
        type: SET_CURRENT_TODOLIST,
        payload: data
    })
}

export const deleteBulletin = (id) => async (dispatch) => {
    const res = await api.post('./bulletins/del', {user_id: id});

    dispatch({
        type: RETRIEVE_DATA,
        payload: res.data.data
    })
    
}

export const setStoreToDoList = (id, list) => async (dispatch) => {
    dispatch({
        type: SET_DELTE_AFTER_TODOLIST,
        payload: {id, list}
    })
}

export const setPhoneNumber = (data) => async (dispatch) => {
    dispatch({
        type: SET_PHONE_NUMBER,
        payload: data
    })
}

export const sendSMS = (number, user_id) => async (dispatch) => {
    const result = await api.post('./bulletins/sms', {number, user_id});
    dispatch({
        type: SEND_SMS,
        payload: number,
    })
}


export const setDataSource = () => async (dispatch) => {
    const result = await api.get('/auth/app');
    
    dispatch({
        type: SET_DATA_SOURCE,
        payload: result.data.data,
    })
}

export const sendInvitation = (number, church_name, id, userId) =>  async (dispatch) => {
    const result = await api.post('./bulletins/invitation', {number, church_name, id, userId});
}


export const acceptInvite = (appuser_id, user_id) => async (dispatch) => {
    const result = api.post('./bulletins/invite_accept', {appuser_id, user_id});
}

export const rejectInvite = (appuser_id, user_id) => async (dispatch) => {
    // const result = api.post('./bulletins/invite', {appuser_id, user_id});
}

export const setHeadingTextColor = (value, color) => async (dispatch) => {
    dispatch({
        type: SET_HEADTEXT_COLOR,
        payload: color,
    })
}
export const setBackgroundColor = (value, color) => async (dispatch) => {
    dispatch({
        type: SET_BACKGROUND_COLOR,
        payload: color,
    })
}
export const setSectionBackgroundColor = (value, color) => async (dispatch) => {
    dispatch({
        type: SET_SECTION_BACKGROUND_COLOR,
        payload: color,
    })
}
export const setSectionTitleColor = (value, color) => async (dispatch) => {
    dispatch({
        type: SET_SECTION_TITLE_COLOR,
        payload: color,
    })
}


export const getColorTheme = () =>  async (dispatch) => {
    const res = await api.get('/bulletins/color');

    if(res.data){
        return res.data.data;
    }
}

export const saveColorThemeFormData = (formData) => async (dispatch) => {
    const res = await uploadApi.post('/bulletins/color', formData);

    return res.data.data;
}

export const deleteColor = (name) => async (dispatch) => {
    api.post('/bulletins/color/del', {name}); 
}

export const iconUpload = (file,todoList_id) => async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    
    let imageUrl = (await uploadApi.post('/upload', formData)).data;

    dispatch({
        type: ICON_UPLOAD,
        payload: {todoList_id, imageUrl}
    })

    return imageUrl;
}

export const deleteIcon = (todoList_id, iconUrl) =>  async (dispatch) => {
    const res = await api.post('/upload/del', {imageUrl: iconUrl});
    if(res.data.data ==="success") {
        dispatch({
            type: DELETE_ICON_URL,
            payload: {id: todoList_id}
        })
    }
}
