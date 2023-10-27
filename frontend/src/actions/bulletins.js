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

export const setHeaderImageurl = (text) => async (dispatch) => {
    dispatch({
        type: HEADER_IMAGE_URL,
        payload: text
    })
}

export const setHeaderDeleteImageurl = (text) => async (dispatch) => {
    dispatch({
        type: HEADER_DELETE_IMAGE_URL,
        payload: text
    })
}


// Announcement
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setAnnouncementBodyText = (bodyText) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BODY_TEXT,
        payload: bodyText
    })
}
export const setAnnouncementButtonLink = (buttonLink) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BUTTON_LINK,
        payload: buttonLink
    })
}
export const setAnnouncementButtonText = (buttonText) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_BUTTON_TEXT,
        payload: buttonText
    })
}
export const setAnnouncementImageUrl = (imageurl) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_IMAGE_URL,
        payload: imageurl
    })
}
export const setAnnouncementDeleteImageUrl = (imageurl) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_DELETE_IMAGE_URL,
        payload: imageurl
    })
}
export const setAnnouncementTitle = (title) => async (dispatch) => {
    dispatch({
        type: ANNOUNCEMENT_TITLE,
        payload: title
    })
}


// Connet Card
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setConnectCardTitle = (title) =>async (dispatch) => {
    dispatch({
        type: CONNECTCARD_TITLE,
        payload: title
    })
}

export const setConnectCardBodyText = (bodyText) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_BODY_TEXT,
        payload: bodyText
    })
}

export const setConnectCardQuestionOne = (questionOne) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE,
        payload: questionOne
    })
}

export const setConnectCardQuestionOneOptionOne = (questionOne) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE_OPTION_ONE,
        payload: questionOne
    })
}

export const setConnectCardQuestionOneOptionTwo = (questionOne) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_ONE_OPTION_TWO,
        payload: questionOne
    })
}

export const setConnectCardQuestionTwo = (questionTwo) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO,
        payload: questionTwo
    })
}

export const setConnectCardQuestionTwoOptionOne = (questionTwo) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO_OPTION_ONE,
        payload: questionTwo
    })
}

export const setConnectCardQuestionTwoOptionTwo = (questionTwo) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_QUESTION_TWO_OPTION_TWO,
        payload: questionTwo
    })
}

export const setConnectCardCheckedValues = (str) => async (dispatch) => {
    dispatch({
        type: CONNECTCARD_CHECKED_VALUES,
        payload: str
    })
}

// Order Of Service
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setOrderOfServiceTitle = (title) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TITLE,
        payload: title
    })
}

export const setOrderOfServiceTopicTitle = (title) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TOPIC_TITLE,
        payload: title
    })
}

export const setOrderOfServiceTopicContent = (title) => async (dispatch) => {
    dispatch({
        type: ORDEROFSERVICE_TOPIC_CONTENT,
        payload:title
    })
}

export const setOrderOfServiceImageurl = (str) => async (disaptch) => {
    disaptch({
        type: ORDEROFSERVICE_IMAGE_URL,
        payload: str
    })
}

export const setOrderOfServiceDeleteImageurl = (str) => async (disaptch) => {
    disaptch({
        type: ORDEROFSERVICE_DELETE_IMAGE_URL,
        payload: str
    })
}

// Event
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setEventTitle = (title) => async (dispatch) => {
    dispatch({
        type: EVENT_TITLE,
        payload: title
    })
}

export const setEventDate = (date) => async (dispatch) => {
    dispatch({
        type: EVENT_DATE,
        payload: date
    })
}

export const setEventLocation = (location) => async (dispatch) => {
    dispatch({
        type: EVENT_LOCATION,
        payload: location
    })
}

export const setEventTimeStart = (time) => async (dispatch) => {
    dispatch({
        type: EVENT_TIME_START,
        payload: time
    })
}

export const setEventTimeEnd = (time) => async (dispatch) => {
    dispatch({
        type: EVENT_TIME_END,
        payload: time
    })
}

export const setEventBodyText = (text) => async (dispatch) => {
    dispatch({
        type: EVENT_BODY_TEXT,
        payload : text
    })
}

export const setEventBtnText = (text) => async (dispatch) => {
    dispatch ({
        type: EVENT_BTN_TEXT,
        payload : text
    })
}

export const setEventBtnLink = (link) => async (dispatch) => {
    dispatch ({
        type: EVENT_BTN_LINK,
        payload:  link
    })
}

export const setEventImageUrl = (str) => async (dispatch) => {
    dispatch({
        type: EVENT_IMAGE_URL,
        payload: str
    })
}

export const setEventDeleteImageUrl = (str) => async (dispatch) => {
    dispatch({
        type: EVENT_DELETE_IMAGE_URL,
        payload: str
    })
}


// Prayer Request
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setPrayerTitle = (title) => async (dispatch) => {
    dispatch({
        type: PRAYER_TITLE,
        payload: title
    })
}

export const setPrayerBodyText = (text) => async (dispatch) => {
    dispatch({
        type: PRAYER_BODY_TEXT,
        payload: text
    })
}

export const setPrayerCheckvalue = (str) => async(dispatch) => {
    dispatch({
        type: PRAYER_CHECKED_VALUE,
        payload: str
    })
}


// Online Giving
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setOnlineTitle = (title) => async (dispatch) => {
    dispatch({
        type: ONLINE_TITLE,
        payload: title
    })
}

export const setOnlineBodyText = (text) => async (dispatch) => {
    dispatch({
        type: ONLINE_BODY_TEXT,
        payload: text
    })
}

export const setOnlineType = (text) => async (dispatch) => {
    dispatch({
        type: ONLINE_TYPE,
        payload: text
    })
}

export const setOnlineLink = (link) => async (dispatch) => {
    dispatch({
        type: ONLINE_LINK,
        payload: link
    })
}

// Website
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const setWebsiteTitle = (title) => async (dispatch) => {
    dispatch({
        type: WEBSITE_TITLE,
        payload: title
    })
}

export const setWebsiteType = (type) => async (dispatch) => {
    dispatch({
        type:WEBSITE_TYPE,
        payload: type
    })
}

export const setWebsiteLink = (link) => async (dispatch) => {
    dispatch({
        type:WEBSITE_LINK,
        payload: link
    })
}

export const setEmbedCode = (text) => async (dispatch) => {
    dispatch({
        type:WEBSITE_EMBED_CODE,
        payload: text,
    })
}

// Video
// ~~~~~~~~~~~~~~~~~~~~~~~
export const setVideoTitle = (title) => async (dispatch) => {
    dispatch({
        type: VIDEO_TITLE,
        payload: title
    })
}

export const setVideoBodyText = (text) => async (dispatch) => {
    dispatch({
        type:VIDEO_BODY_TEXT,
        payload: text
    })
}

export const setVideoPlatform = (form) => async (dispatch) => {
    dispatch({
        type: VIDEO_PLATFORM,
        payload: form
    })
}

export const setVideoLink = (link) => async (dispatch) => {
    dispatch({
        type:VIDEO_LINK,
        payload: link
    })
}