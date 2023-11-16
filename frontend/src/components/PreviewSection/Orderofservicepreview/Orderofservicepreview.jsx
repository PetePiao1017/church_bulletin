import React, { useEffect, useState } from "react";
import './Orderofservicepreview.scss';
import { connect } from "react-redux";

const Orderofservicepreview = (props) => {
    
    const [title, setTitle] = useState("");
    const [topic_title, setTopicTitle] = useState([]);
    const [topic_content, setTopicContent] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let topic_title_index = props.todoList[index].data.findIndex(item => item.dataType === "topic_title");
            let topic_content_index = props.todoList[index].data.findIndex(item => item.dataType === "topic_content");
            let imageUrl_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(topic_title_index !== -1) setTopicTitle(props.todoList[index].data[topic_title_index].value);
            if(topic_content_index !== -1) setTopicContent(props.todoList[index].data[topic_content_index].value);
            if(imageUrl_index !== -1) setImageUrl(props.todoList[index].data[imageUrl_index].value);
        }
    },[props.todoList]);

    return(
            <div className='scroll-bar'>
                <br />
                <br />
                <br />
                <h3 className='app-header'>
                    {title === "" ? "Order Of Service" : title}
                </h3>
                <div className='app-image'>
                    
                {
                    imageUrl === 0
                    ? <img src = "./gallery.png"  alt = "Gallery Image" />
                    : <img src = {imageUrl} alt = "preview" style = {{width : "100%", height:"100%"}} />
                }
                   
                </div>
                <div className="service-topic">
                    <h3 className={topic_title.length === 0 ? "topic-header" :"topic-header-active"}>
                        {
                        topic_title.length === 0 ? "Service Topics 101" : topic_title[0]
                        }
                    </h3>
                    <p className={topic_content.length === 0 ? "topic-content" : "topic-content-active"}>
                        {
                        topic_content.length === 0 ? "Add edit and delete your service topics using the panel on the left Add edit and delete your service topics using the panel on the left"
                        : topic_content[0]
                        }
                    </p>
                </div>
                <div className="service-topic">
                    <h3 className={topic_title.length === 0 ? "topic-header" :"topic-header-active"}>
                        {
                        topic_title.length === 0 ? "Keep Everyone in loop" : topic_title[1]
                        }
                    </h3>
                    <p className={topic_content.length === 0 ? "topic-content" : "topic-content-active"}>
                        {
                        topic_content.length === 0 ? "Add edit and delete your service topics using the panel on the left Add edit and delete your service topics using the panel on the left"
                        : topic_content[1]
                        }
                    </p>
                </div>
                
                {
                    topic_title.length !== 0 ?
                    topic_title.map((item, index) => {
                        if(index >= 2){
                            return (
                                <div className="service-topic">
                                    <h3 className="topic-header-active">
                                        {item}
                                    </h3>
                                    {
                                        topic_content.length === 0 ? ""
                                        :
                                        
                                        <p className="topic-content-active">
                                            {
                                                topic_content.length >=2 
                                                ? topic_content[index]
                                                : ""
                                            }
                                        </p>
                                        
                                    }
                                    
                                </div>
                            )
                        }
                    })
                    : ""
                }
            </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps)(Orderofservicepreview)