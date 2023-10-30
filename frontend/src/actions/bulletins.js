import { 
    HEADER_TITLE,
    HEADER_DATE,
    HEADER_DELETE_IMAGE_URL,

    ANNOUNCEMENT_BODY_TEXT, 
    ANNOUNCEMENT_BUTTON_LINK, 
    ANNOUNCEMENT_BUTTON_TEXT, 
    ANNOUNCEMENT_IMAGE_URL,
    ANNOUNCEMENT_DELETE_IMAGE_URL,
    ANNOUNCEMENT_TITLE,
    
    CONNECTCARD_BODY_TEXT,
    CONNECTCARD_CHECKED_VALUES,
    CONNECTCARD_QUESTION_ONE,
    CONNECTCARD_QUESTION_ONE_OPTION_ONE,
    CONNECTCARD_QUESTION_ONE_OPTION_TWO,
    CONNECTCARD_QUESTION_TWO,
    CONNECTCARD_QUESTION_TWO_OPTION_ONE,
    CONNECTCARD_QUESTION_TWO_OPTION_TWO,
    CONNECTCARD_TITLE,

    EVENT_BODY_TEXT,
    EVENT_BTN_LINK,
    EVENT_BTN_TEXT,
    EVENT_DATE,
    EVENT_LOCATION,
    EVENT_TIME_END,
    EVENT_TIME_START,
    EVENT_TITLE,
    EVENT_DELETE_IMAGE_URL,
    EVENT_IMAGE_URL,

    ONLINE_BODY_TEXT,
    ONLINE_LINK,
    ONLINE_TITLE,
    ONLINE_TYPE,

    ORDEROFSERVICE_TITLE,
    ORDEROFSERVICE_TOPIC_CONTENT,
    ORDEROFSERVICE_TOPIC_TITLE,
    ORDEROFSERVICE_IMAGE_URL,
    ORDEROFSERVICE_DELETE_IMAGE_URL,

    PRAYER_BODY_TEXT,
    PRAYER_CHECKED_VALUE,
    PRAYER_TITLE,

    VIDEO_BODY_TEXT,
    VIDEO_LINK,
    VIDEO_PLATFORM,
    VIDEO_TITLE,

    WEBSITE_EMBED_CODE,
    WEBSITE_LINK,
    WEBSITE_TITLE,
    WEBSITE_TYPE,
    HEADER_IMAGE_URL,
} from './types';

import axios from 'axios';
import api from '../utils/api';
const uploadApi = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
});
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


// Announcement
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setAnnouncementBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BODY_TEXT,
        payload: tempObj
    })
}
export const setAnnouncementButtonLink = (tempObj) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BUTTON_LINK,
        payload: tempObj
    })
}
export const setAnnouncementButtonText = (tempObj) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BUTTON_TEXT,
        payload: tempObj
    })
}
export const setAnnouncementImageUrl = (file, id) => async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    
    let imageUrl = (await uploadApi.post('/upload', formData)).data;

    let tempObj = {
        id: id,
        str: imageUrl
    }

    dispatch({
        type: ANNOUNCEMENT_IMAGE_URL,
        payload: tempObj
    })
}
export const setAnnouncementDeleteImageUrl = (imageUrl, id) => async (dispatch) => {
    api.post('/upload/del', {imageUrl: imageUrl.str});
    dispatch({
        type: ANNOUNCEMENT_DELETE_IMAGE_URL,
        payload: id
    })
}
export const setAnnouncementTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_TITLE,
        payload: tempObj
    })
}


// Connet Card
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setConnectCardTitle = (tempObj) =>async (dispatch) => {
    dispatch({
        type: CONNECTCARD_TITLE,
        payload: tempObj
    })
}

export const setConnectCardBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_BODY_TEXT,
        payload: tempObj
    })
}

export const setConnectCardQuestionOne = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE,
        payload: tempObj
    })
}

export const setConnectCardQuestionOneOptionOne = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE_OPTION_ONE,
        payload: tempObj
    })
}

export const setConnectCardQuestionOneOptionTwo = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE_OPTION_TWO,
        payload: tempObj
    })
}

export const setConnectCardQuestionTwo = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO,
        payload: tempObj
    })
}

export const setConnectCardQuestionTwoOptionOne = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO_OPTION_ONE,
        payload: tempObj
    })
}

export const setConnectCardQuestionTwoOptionTwo = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO_OPTION_TWO,
        payload: tempObj
    })
}

export const setConnectCardCheckedValues = (tempObj) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_CHECKED_VALUES,
        payload: tempObj
    })
}

// Order Of Service
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setOrderOfServiceTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TITLE,
        payload: tempObj
    })
}

export const setOrderOfServiceTopicTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TOPIC_TITLE,
        payload: tempObj
    })
}

export const setOrderOfServiceTopicContent = (tempObj) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TOPIC_CONTENT,
        payload:tempObj
    })
}

export const setOrderOfServiceImageurl = (file, id) => async (disaptch) => {
    let formData = new FormData();
    formData.append("file", file);
    
    let imageUrl = (await uploadApi.post('/upload', formData)).data;

    let tempObj = {
        id: id,
        str: imageUrl
    }
    disaptch({
        type: ORDEROFSERVICE_IMAGE_URL,
        payload: tempObj
    })
}

export const setOrderOfServiceDeleteImageurl = (imageUrl, id ) => async (disaptch) => {
    api.post('/upload/del', {imageUrl: imageUrl.str});
    disaptch({
        type: ORDEROFSERVICE_DELETE_IMAGE_URL,
        payload: id
    })
}

// Event
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setEventTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_TITLE,
        payload: tempObj
    })
}

export const setEventDate = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_DATE,
        payload: tempObj
    })
}

export const setEventLocation = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_LOCATION,
        payload: tempObj
    })
}

export const setEventTimeStart = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_TIME_START,
        payload: tempObj
    })
}

export const setEventTimeEnd = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_TIME_END,
        payload: tempObj
    })
}

export const setEventBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type: EVENT_BODY_TEXT,
        payload : tempObj
    })
}

export const setEventBtnText = (tempObj) => async (dispatch) => {
    dispatch ({
        type: EVENT_BTN_TEXT,
        payload : tempObj
    })
}

export const setEventBtnLink = (tempObj) => async (dispatch) => {
    dispatch ({
        type: EVENT_BTN_LINK,
        payload:  tempObj
    })
}

export const setEventImageUrl = (file, id) => async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    
    let imageUrl = (await uploadApi.post('/upload', formData)).data;

    let tempObj = {
        id: id,
        str: imageUrl
    }
    dispatch({
        type: EVENT_IMAGE_URL,
        payload: tempObj
    })
}

export const setEventDeleteImageUrl = (imageUrl, id) => async (dispatch) => {
    api.post('/upload/del', {imageUrl: imageUrl.str});

    dispatch({
        type: EVENT_DELETE_IMAGE_URL,
        payload: id
    })
}


// Prayer Request
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setPrayerTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: PRAYER_TITLE,
        payload: tempObj
    })
}

export const setPrayerBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type: PRAYER_BODY_TEXT,
        payload: tempObj
    })
}

export const setPrayerCheckvalue = (tempObj) => async(dispatch) => {
    dispatch({
        type: PRAYER_CHECKED_VALUE,
        payload: tempObj
    })
}


// Online Giving
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setOnlineTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: ONLINE_TITLE,
        payload: tempObj
    })
}

export const setOnlineBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type: ONLINE_BODY_TEXT,
        payload: tempObj
    })
}

export const setOnlineType = (text) => async (dispatch) => {
    dispatch({
        type: ONLINE_TYPE,
        payload: text
    })
}

export const setOnlineLink = (tempObj) => async (dispatch) => {
    dispatch({
        type: ONLINE_LINK,
        payload: tempObj
    })
}

// Website
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setWebsiteTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: WEBSITE_TITLE,
        payload: tempObj
    })
}

export const setWebsiteType = (type) => async (dispatch) => {
    dispatch({
        type:WEBSITE_TYPE,
        payload: type
    })
}

export const setWebsiteLink = (tempObj) => async (dispatch) => {
    dispatch({
        type:WEBSITE_LINK,
        payload: tempObj
    })
}

export const setEmbedCode = (tempObj) => async (dispatch) => {
    dispatch({
        type:WEBSITE_EMBED_CODE,
        payload: tempObj,
    })
}

// Video
// ~~~~~~~~~~~~~~~~~~~~~~~
export const setVideoTitle = (tempObj) => async (dispatch) => {
    dispatch({
        type: VIDEO_TITLE,
        payload: tempObj
    })
}

export const setVideoBodyText = (tempObj) => async (dispatch) => {
    dispatch({
        type:VIDEO_BODY_TEXT,
        payload: tempObj
    })
}

export const setVideoPlatform = (tempObj) => async (dispatch) => {
    dispatch({
        type: VIDEO_PLATFORM,
        payload: tempObj
    })
}

export const setVideoLink = (tempObj) => async (dispatch) => {
    dispatch({
        type:VIDEO_LINK,
        payload: tempObj
    })
}
