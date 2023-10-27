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
    ANNOUNCEMENT_FILE,

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

    announcment_bodyText: '',
    announcment_buttonLink: '',
    announcment_buttonText: 'Button Text',
    announcment_imageurl: '',
    announcment_Title: 'Announcement',
  

    connectcard_Title: 'Connect Card',
    connectcard_Image: '',
    connectcard_bodyText: '',
    connectcard_Question_One: '',
    connectcard_Question_One_Option_One:'To follow Jesus',
    connectcard_Question_One_Option_Two:'To Redency my life to Jesus',
    connectcard_Question_Two: '',
    connectcard_Question_Two_Option_One: 'Friend/Family',
    connectcard_Question_Two_Option_Two: 'Church/Website',
    connectcard_checkedvalues: [],

    orderofservice_Title:'Order Of Service',
    orderofservice_Topic_Title: '',
    orderofservice_Topic_Content: '',
    orderofservice_imageurl: '',

    event_Title: 'Event',
    event_Date: '',
    event_Time_Start: '',
    event_Time_End: '',
    event_Location: '',
    event_bodyText: '',
    event_btnText: '',
    event_btnLink: '',
    event_imageurl: '',

    prayer_Title: 'Prayer Request',
    prayer_bodyText: '',
    prayer_checkedvalue: [],

    online_Title: 'Online Giving',
    online_bodyText: '',
    online_Type:'',
    online_Link:'',

    website_Title: 'Website',
    website_Type:'',
    website_Link:'',
    website_embed_code:'',

    video_Title: 'Video',
    video_bodyText: '',
    video_Platform:'Other',
    video_Link:''


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
          return {
            ...state,
            announcment_bodyText: payload
          };
        case ANNOUNCEMENT_BUTTON_LINK:
          return {
            ...state,
            announcment_buttonLink: payload
          };
        case ANNOUNCEMENT_BUTTON_TEXT:
          if(payload){
            return {
              ...state,
              announcment_buttonText: payload
            };
          }
        case ANNOUNCEMENT_TITLE:
          if(payload){
            return {
              ...state,
              announcment_Title: payload
            };
          };
          
        case ANNOUNCEMENT_IMAGE_URL:
          return {
            ...state,
            announcment_imageurl: payload
          };
        case ANNOUNCEMENT_DELETE_IMAGE_URL:
          return {
            ...state,
            announcment_imageurl: payload
          };

        case CONNECTCARD_TITLE:
          if(payload){
            return {
              ...state,
              connectcard_Title: payload
            };
          };

        case CONNECTCARD_IMAGE:
          return {
            ...state,
            connectcard_Image: payload
          };
        
        case CONNECTCARD_BODY_TEXT:
          return {
            ...state,
            connectcard_bodyText: payload
          }
        case CONNECTCARD_QUESTION_ONE:
          return {
            ...state,
            connectcard_Question_One: payload
          }

        case CONNECTCARD_QUESTION_ONE_OPTION_ONE:
          return {
            ...state,
            connectcard_Question_One_Option_One: payload
          }
        
        case CONNECTCARD_QUESTION_ONE_OPTION_TWO:
          return {
            ...state,
            connectcard_Question_One_Option_Two: payload
          }
 
        case CONNECTCARD_QUESTION_TWO:
          return {
            ...state,
            connectcard_Question_Two: payload
          }
        
        case CONNECTCARD_QUESTION_TWO_OPTION_ONE:
          return {
            ...state,
            connectcard_Question_Two_Option_One: payload
          }
        
        case CONNECTCARD_QUESTION_TWO_OPTION_TWO:
          return {
            ...state,
            connectcard_Question_Two_Option_Two: payload
          }
        case CONNECTCARD_CHECKED_VALUES:
          return {
            ...state,
            connectcard_checkedvalues: payload
          }


        case ORDEROFSERVICE_TITLE:
          return {
            ...state,
            orderofservice_Title: payload
          }
        case ORDEROFSERVICE_TOPIC_TITLE:
          return {
            ...state,
            orderofservice_Topic_Title: payload
          }
        case ORDEROFSERVICE_TOPIC_CONTENT:
          return {
            ...state,
            orderofservice_Topic_Content: payload
          }

        case ORDEROFSERVICE_IMAGE_URL:
          return{
            ...state,
            orderofservice_imageurl: payload
          }
        case ORDEROFSERVICE_DELETE_IMAGE_URL:
          return {
            ...state,
            orderofservice_imageurl: ''
          }


        case EVENT_TITLE:
          return {
            ...state,
            event_Title:payload
          }
        case EVENT_DATE:
          return {
            ...state,
            event_Date: payload
          }
        case EVENT_TIME_START:
          return {
            ...state,
            event_Time_Start: payload
          }
        
        case EVENT_TIME_END : 
          return {
            ...state,
            event_Time_End: payload
          }

        case EVENT_LOCATION :
          return {
            ...state,
            event_Location: payload
          }
        case EVENT_BODY_TEXT :
          return {
            ...state,
            event_bodyText:payload
          }
        case EVENT_BTN_TEXT:
          return {
            ...state,
            event_btnText:payload
          }
        case EVENT_BTN_LINK:
          return {
            ...state,
            event_btnLink: payload
          }

        case EVENT_IMAGE_URL:
          return {
            ...state,
            event_imageurl: payload
          }

        case EVENT_DELETE_IMAGE_URL:
          return {
            ...state,
            event_imageurl: ''
          }
        case PRAYER_TITLE: 
          return {
            ...state,
            prayer_Title: payload
          }
        case PRAYER_BODY_TEXT:
          return {
            ...state,
            prayer_bodyText: payload
          }

        case PRAYER_CHECKED_VALUE:
          return {
            ...state,
            prayer_checkedvalue: payload
          }
        
        case ONLINE_TITLE:
          return {
            ...state,
            online_Title: payload
          }
        case ONLINE_BODY_TEXT:
          return {
            ...state,
            online_bodyText: payload
          }
        case ONLINE_TYPE:
          return {
            ...state,
            online_Type: payload
          }
        case ONLINE_LINK:
          return {
            ...state,
            online_Link: payload
          }

        case WEBSITE_TITLE:
          return {
            ...state,
            website_Title: payload
          }
        case WEBSITE_TYPE:
          return {
            ...state,
            website_Type: payload
          }
        case WEBSITE_LINK:
          return {
            ...state,
            website_Link: payload
          }
        case WEBSITE_EMBED_CODE:
          return {
            ...state,
            website_embed_code: payload
          }
        case VIDEO_TITLE:
          return {
            ...state,
            video_Title: payload
          }
        case VIDEO_BODY_TEXT:
          return {
            ...state,
            video_bodyText: payload
          }
        case VIDEO_PLATFORM:
          return {
            ...state,
            video_Platform: payload
          }
        case VIDEO_LINK:
          return {
            ...state,
            video_Link: payload
          }
        default:
          return state;
      }
}

export default bulletinsReducer;