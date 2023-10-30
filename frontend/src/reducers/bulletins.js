import {

    HEADER_IMAGE_URL,
    HEADER_DATE,
    HEADER_DELETE_IMAGE_URL,

    ANNOUNCEMENT_BODY_TEXT, 
    ANNOUNCEMENT_BUTTON_LINK, 
    ANNOUNCEMENT_BUTTON_TEXT, 
    ANNOUNCEMENT_IMAGE_URL, 
    ANNOUNCEMENT_DELETE_IMAGE_URL, 
    ANNOUNCEMENT_TITLE,

    CONNECTCARD_BODY_TEXT,
    CONNECTCARD_IMAGE,
    CONNECTCARD_QUESTION_ONE,
    CONNECTCARD_QUESTION_ONE_OPTION_ONE,
    CONNECTCARD_QUESTION_ONE_OPTION_TWO,
    CONNECTCARD_QUESTION_TWO,
    CONNECTCARD_QUESTION_TWO_OPTION_ONE,
    CONNECTCARD_QUESTION_TWO_OPTION_TWO,
    CONNECTCARD_TITLE,
    CONNECTCARD_CHECKED_VALUES,

    EVENT_BODY_TEXT,
    EVENT_DATE,
    EVENT_LOCATION,
    EVENT_TIME_START,
    EVENT_TIME_END,
    EVENT_TITLE,
    EVENT_BTN_TEXT,
    EVENT_BTN_LINK,
    EVENT_IMAGE_URL,
    EVENT_DELETE_IMAGE_URL,

    ORDEROFSERVICE_TITLE,
    ORDEROFSERVICE_TOPIC_CONTENT,
    ORDEROFSERVICE_TOPIC_TITLE,
    ORDEROFSERVICE_IMAGE_URL,
    ORDEROFSERVICE_DELETE_IMAGE_URL,

    PRAYER_TITLE,
    PRAYER_BODY_TEXT,
    PRAYER_CHECKED_VALUE,

    ONLINE_TITLE,
    ONLINE_BODY_TEXT,
    WEBSITE_TITLE,
    VIDEO_TITLE,
    VIDEO_BODY_TEXT,
    VIDEO_PLATFORM,
    VIDEO_LINK,
    WEBSITE_TYPE,
    WEBSITE_LINK,
    ONLINE_TYPE,
    ONLINE_LINK,
    WEBSITE_EMBED_CODE,
    HEADER_TITLE,

  } from "../actions/types";

const initialState = {

    header_date: '',
    header_title: '',
    header_imageurl: '',

    announcment_bodyText: [],
    announcment_buttonLink: [],
    announcment_buttonText: [],
    announcment_imageurl: [],
    announcment_Title: [],
  

    connectcard_Title: [],
    connectcard_Image: '',
    connectcard_bodyText: [],
    connectcard_Question_One: [],
    connectcard_Question_One_Option_One:[],
    connectcard_Question_One_Option_Two:[],
    connectcard_Question_Two: [],
    connectcard_Question_Two_Option_One: [],
    connectcard_Question_Two_Option_Two: [],
    connectcard_checkedvalues: [],

    orderofservice_Title: [],
    orderofservice_Topic_Title: [],
    orderofservice_Topic_Content: [],
    orderofservice_imageurl: [],

    event_Title: [],
    event_Date: [],
    event_Time_Start: [],
    event_Time_End: [],
    event_Location: [],
    event_bodyText: [],
    event_btnText: [],
    event_btnLink: [],
    event_imageurl: [],

    prayer_Title: [],
    prayer_bodyText: [],
    prayer_checkedvalue: [],

    online_Title: [],
    online_bodyText: [],
    online_Type:[],
    online_Link:[],

    website_Title: [],
    website_Type: [],
    website_Link: [],
    website_embed_code: [],

    video_Title: [],
    video_bodyText: [],
    video_Platform: [],
    video_Link: [],

    flag: false,
};

function bulletinsReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
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

        case ANNOUNCEMENT_BODY_TEXT:
          if(payload){
            let index = state.announcment_bodyText.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.announcment_bodyText.slice(0, index),
                payload,
                ...state.announcment_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                announcment_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                announcment_bodyText: [...state.announcment_bodyText, payload]
              }
            }
          }
        case ANNOUNCEMENT_BUTTON_LINK:
          if(payload){
            let index = state.announcment_buttonLink.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.announcment_buttonLink.slice(0, index),
                payload,
                ...state.announcment_buttonLink.slice(index + 1)
              ];
              return {
                ...state,
                announcment_buttonLink: updatedArray
              }
            }
            else{
              return {
                ...state,
                announcment_buttonLink: [...state.announcment_buttonLink, payload]
              }
            }
          }
        case ANNOUNCEMENT_BUTTON_TEXT:
          if(payload){
            let index = state.announcment_buttonText.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.announcment_buttonText.slice(0, index),
                payload,
                ...state.announcment_buttonText.slice(index + 1)
              ];
              return {
                ...state,
                announcment_buttonText: updatedArray
              }
            }
            else{
              return {
                ...state,
                announcment_buttonText: [...state.announcment_buttonText, payload]
              }
            }
          }
        case ANNOUNCEMENT_TITLE:
          if(payload){
            let index = state.announcment_Title.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.announcment_Title.slice(0, index),
                payload,
                ...state.announcment_Title.slice(index + 1)
              ];
              return {
                ...state,
                announcment_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                announcment_Title: [...state.announcment_Title, payload]
              }
            }
          };
          
        case ANNOUNCEMENT_IMAGE_URL:
          if(payload){
            let index = state.announcment_imageurl.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.announcment_imageurl.slice(0, index),
                payload,
                ...state.announcment_imageurl.slice(index + 1)
              ];
              return {
                ...state,
                announcment_imageurl: updatedArray
              }
            }
            else{
              return {
                ...state,
                announcment_imageurl: [...state.announcment_imageurl, payload]
              }
            }
          };
        case ANNOUNCEMENT_DELETE_IMAGE_URL:
          return {
            ...state,
            announcment_imageurl: state.announcment_imageurl.filter(item => item.id !== payload)
          };

        case CONNECTCARD_TITLE:
          if(payload){
            let index = state.connectcard_Title.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Title.slice(0, index),
                payload,
                ...state.connectcard_Title.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Title: [...state.connectcard_Title, payload]
              }
            }
          };
          

        case CONNECTCARD_IMAGE:
          return {
            ...state,
            connectcard_Image: payload
          };
        
        case CONNECTCARD_BODY_TEXT:
          if(payload){
            let index = state.connectcard_bodyText.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_bodyText.slice(0, index),
                payload,
                ...state.connectcard_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_bodyText: [...state.connectcard_bodyText, payload]
              }
            }
          };
          
        case CONNECTCARD_QUESTION_ONE:
          if(payload){
            let index = state.connectcard_Question_One.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_One.slice(0, index),
                payload,
                ...state.connectcard_Question_One.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_One: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_One: [...state.connectcard_Question_One, payload]
              }
            }
          };
          

        case CONNECTCARD_QUESTION_ONE_OPTION_ONE:
          if(payload){
            let index = state.connectcard_Question_One_Option_One.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_One_Option_One.slice(0, index),
                payload,
                ...state.connectcard_Question_One_Option_One.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_One_Option_One: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_One_Option_One: [...state.connectcard_Question_One_Option_One, payload]
              }
            }
          };
          
        
        case CONNECTCARD_QUESTION_ONE_OPTION_TWO:
          if(payload){
            let index = state.connectcard_Question_One_Option_Two.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_One_Option_Two.slice(0, index),
                payload,
                ...state.connectcard_Question_One_Option_Two.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_One_Option_Two: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_One_Option_Two: [...state.connectcard_Question_One_Option_Two, payload]
              }
            }
          };
          
 
        case CONNECTCARD_QUESTION_TWO:
          if(payload){
            let index = state.connectcard_Question_Two.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_Two.slice(0, index),
                payload,
                ...state.connectcard_Question_Two.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_Two: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_Two: [...state.connectcard_Question_Two, payload]
              }
            }
          };
          
        
        case CONNECTCARD_QUESTION_TWO_OPTION_ONE:
          if(payload){
            let index = state.connectcard_Question_Two_Option_One.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_Two_Option_One.slice(0, index),
                payload,
                ...state.connectcard_Question_Two_Option_One.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_Two_Option_One: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_Two_Option_One: [...state.connectcard_Question_Two_Option_One, payload]
              }
            }
          };
          
        
        case CONNECTCARD_QUESTION_TWO_OPTION_TWO:
          if(payload){
            let index = state.connectcard_Question_Two_Option_Two.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_Question_Two_Option_Two.slice(0, index),
                payload,
                ...state.connectcard_Question_Two_Option_Two.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_Question_Two_Option_Two: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_Question_Two_Option_Two: [...state.connectcard_Question_Two_Option_Two, payload]
              }
            }
          };
          
        case CONNECTCARD_CHECKED_VALUES:
          if(payload){
            let index = state.connectcard_checkedvalues.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.connectcard_checkedvalues.slice(0, index),
                payload,
                ...state.connectcard_checkedvalues.slice(index + 1)
              ];
              return {
                ...state,
                connectcard_checkedvalues: updatedArray
              }
            }
            else{
              return {
                ...state,
                connectcard_checkedvalues: [...state.connectcard_checkedvalues, payload]
              }
            }
          };
          

// Order Of Service
        case ORDEROFSERVICE_TITLE:
          if(payload){
            let index = state.orderofservice_Title.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.orderofservice_Title.slice(0, index),
                payload,
                ...state.orderofservice_Title.slice(index + 1)
              ];
              return {
                ...state,
                orderofservice_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                orderofservice_Title: [...state.orderofservice_Title, payload]
              }
            }
          };
        case ORDEROFSERVICE_TOPIC_TITLE:
          if(payload){
            let index = state.orderofservice_Topic_Title.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.orderofservice_Topic_Title.slice(0, index),
                payload,
                ...state.orderofservice_Topic_Title.slice(index + 1)
              ];
              return {
                ...state,
                orderofservice_Topic_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                orderofservice_Topic_Title: [...state.orderofservice_Topic_Title, payload]
              }
            }
          };
        case ORDEROFSERVICE_TOPIC_CONTENT:
          if(payload){
            let index = state.orderofservice_Topic_Content.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.orderofservice_Topic_Content.slice(0, index),
                payload,
                ...state.orderofservice_Topic_Content.slice(index + 1)
              ];
              return {
                ...state,
                orderofservice_Topic_Content: updatedArray
              }
            }
            else{
              return {
                ...state,
                orderofservice_Topic_Content: [...state.orderofservice_Topic_Content, payload]
              }
            }
          };

        case ORDEROFSERVICE_IMAGE_URL:
          if(payload){
            let index = state.orderofservice_imageurl.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.orderofservice_imageurl.slice(0, index),
                payload,
                ...state.orderofservice_imageurl.slice(index + 1)
              ];
              return {
                ...state,
                orderofservice_imageurl: updatedArray
              }
            }
            else{
              return {
                ...state,
                orderofservice_imageurl: [...state.orderofservice_imageurl, payload]
              }
            }
          };
        case ORDEROFSERVICE_DELETE_IMAGE_URL:
          return {
            ...state,
            orderofservice_imageurl: state.orderofservice_imageurl.filter(item => item.id !== payload)
          };


        case EVENT_TITLE:
          if(payload){
            let index = state.event_Title.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_Title.slice(0, index),
                payload,
                ...state.event_Title.slice(index + 1)
              ];
              return {
                ...state,
                event_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_Title: [...state.event_Title, payload]
              }
            }
          };
        case EVENT_DATE:
          if(payload){
            let index = state.event_Date.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_Date.slice(0, index),
                payload,
                ...state.event_Date.slice(index + 1)
              ];
              return {
                ...state,
                event_Date: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_Date: [...state.event_Date, payload]
              }
            }
          };
        case EVENT_TIME_START:
          if(payload){
            let index = state.event_Time_Start.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_Time_Start.slice(0, index),
                payload,
                ...state.event_Time_Start.slice(index + 1)
              ];
              return {
                ...state,
                event_Time_Start: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_Time_Start: [...state.event_Time_Start, payload]
              }
            }
          };
        
        case EVENT_TIME_END : 
        if(payload){
          let index = state.event_Time_End.findIndex(item => item.id == payload.id);
          if(index !== -1){
            const updatedArray = [
              ...state.event_Time_End.slice(0, index),
              payload,
              ...state.event_Time_End.slice(index + 1)
            ];
            return {
              ...state,
              event_Time_End: updatedArray
            }
          }
          else{
            return {
              ...state,
              event_Time_End: [...state.event_Time_End, payload]
            }
          }
        };

        case EVENT_LOCATION :
          if(payload){
            let index = state.event_Location.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_Location.slice(0, index),
                payload,
                ...state.event_Location.slice(index + 1)
              ];
              return {
                ...state,
                event_Location: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_Location: [...state.event_Location, payload]
              }
            }
          };
        case EVENT_BODY_TEXT :
          if(payload){
            let index = state.event_bodyText.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_bodyText.slice(0, index),
                payload,
                ...state.event_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                event_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_bodyText: [...state.event_bodyText, payload]
              }
            }
          };
        case EVENT_BTN_TEXT:
          if(payload){
            let index = state.event_btnText.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_btnText.slice(0, index),
                payload,
                ...state.event_btnText.slice(index + 1)
              ];
              return {
                ...state,
                event_btnText: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_btnText: [...state.event_btnText, payload]
              }
            }
          };
        case EVENT_BTN_LINK:
          if(payload){
            let index = state.event_btnLink.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_btnLink.slice(0, index),
                payload,
                ...state.event_btnLink.slice(index + 1)
              ];
              return {
                ...state,
                event_btnLink: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_btnLink: [...state.event_btnLink, payload]
              }
            }
          };

        case EVENT_IMAGE_URL:
          if(payload){
            let index = state.event_imageurl.findIndex(item => item.id == payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.event_imageurl.slice(0, index),
                payload,
                ...state.event_imageurl.slice(index + 1)
              ];
              return {
                ...state,
                event_imageurl: updatedArray
              }
            }
            else{
              return {
                ...state,
                event_imageurl: [...state.event_imageurl, payload]
              }
            }
          };

        case EVENT_DELETE_IMAGE_URL:
          return {
            ...state,
            event_imageurl: state.event_imageurl.filter(item => item.id !== payload)
          };
        case PRAYER_TITLE: 
          if(payload){
            let index = state.prayer_Title.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.prayer_Title.slice(0, index),
                payload,
                ...state.prayer_Title.slice(index + 1)
              ];
              return {
                ...state,
                prayer_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                prayer_Title: [...state.prayer_Title, payload]
              }
            }
          };
        case PRAYER_BODY_TEXT:
          if(payload){
            let index = state.prayer_bodyText.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.prayer_bodyText.slice(0, index),
                payload,
                ...state.prayer_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                prayer_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                prayer_bodyText: [...state.prayer_bodyText, payload]
              }
            }
          };

        case PRAYER_CHECKED_VALUE:
          return {
            ...state,
            prayer_checkedvalue: payload
          }
        
        case ONLINE_TITLE:
          if(payload){
            let index = state.online_Title.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.online_Title.slice(0, index),
                payload,
                ...state.online_Title.slice(index + 1)
              ];
              return {
                ...state,
                online_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                online_Title: [...state.online_Title, payload]
              }
            }
          };
        case ONLINE_BODY_TEXT:
          if(payload){
            let index = state.online_bodyText.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.online_bodyText.slice(0, index),
                payload,
                ...state.online_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                online_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                online_bodyText: [...state.online_bodyText, payload]
              }
            }
          };
        case ONLINE_TYPE:
          return {
            ...state,
            online_Type: payload
          }
        case ONLINE_LINK:
          if(payload){
            let index = state.online_Link.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.online_Link.slice(0, index),
                payload,
                ...state.online_Link.slice(index + 1)
              ];
              return {
                ...state,
                online_Link: updatedArray
              }
            }
            else{
              return {
                ...state,
                online_Link: [...state.online_Link, payload]
              }
            }
          };

        case WEBSITE_TITLE:
          if(payload){
            let index = state.website_Title.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.website_Title.slice(0, index),
                payload,
                ...state.website_Title.slice(index + 1)
              ];
              return {
                ...state,
                website_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                website_Title: [...state.website_Title, payload]
              }
            }
          };
        case WEBSITE_TYPE:
          return {
            ...state,
            website_Type: payload
          }
        case WEBSITE_LINK:
          if(payload){
            let index = state.website_Link.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.website_Link.slice(0, index),
                payload,
                ...state.website_Link.slice(index + 1)
              ];
              return {
                ...state,
                website_Link: updatedArray
              }
            }
            else{
              return {
                ...state,
                website_Link: [...state.website_Link, payload]
              }
            }
          };
        case WEBSITE_EMBED_CODE:
          if(payload){
            let index = state.website_embed_code.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.website_embed_code.slice(0, index),
                payload,
                ...state.website_embed_code.slice(index + 1)
              ];
              return {
                ...state,
                website_embed_code: updatedArray
              }
            }
            else{
              return {
                ...state,
                website_embed_code: [...state.website_embed_code, payload]
              }
            }
          };
        case VIDEO_TITLE:
          if(payload){
            let index = state.video_Title.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.video_Title.slice(0, index),
                payload,
                ...state.video_Title.slice(index + 1)
              ];
              return {
                ...state,
                video_Title: updatedArray
              }
            }
            else{
              return {
                ...state,
                video_Title: [...state.video_Title, payload]
              }
            }
          };
        case VIDEO_BODY_TEXT:
          if(payload){
            let index = state.video_bodyText.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.video_bodyText.slice(0, index),
                payload,
                ...state.video_bodyText.slice(index + 1)
              ];
              return {
                ...state,
                video_bodyText: updatedArray
              }
            }
            else{
              return {
                ...state,
                video_bodyText: [...state.video_bodyText, payload]
              }
            }
          };
        case VIDEO_PLATFORM:
          if(payload){
            let index = state.video_Platform.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.video_Platform.slice(0, index),
                payload,
                ...state.video_Platform.slice(index + 1)
              ];
              return {
                ...state,
                video_Platform: updatedArray
              }
            }
            else{
              return {
                ...state,
                video_Platform: [...state.video_Platform, payload]
              }
            }
          };
        case VIDEO_LINK:
          if(payload){
            let index = state.video_Link.findIndex(item => item.id === payload.id);
            if(index !== -1){
              const updatedArray = [
                ...state.video_Link.slice(0, index),
                payload,
                ...state.video_Link.slice(index + 1)
              ];
              return {
                ...state,
                video_Link: updatedArray
              }
            }
            else{
              return {
                ...state,
                video_Link: [...state.video_Link, payload]
              }
            }
          };
        
          default:
          return state;
      }
}

export default bulletinsReducer;