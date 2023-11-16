import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Website } from "../../SVG";

const Websitepreview = (props) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [embedcode, setEmbedcode] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let link_index = props.todoList[index].data.findIndex(item => item.dataType === "link");
            let embedcode_index = props.todoList[index].data.findIndex(item => item.dataType === "embed_code");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(link_index !== -1) setLink(props.todoList[index].data[link_index].value);
            if(embedcode_index !== -1) setEmbedcode(props.todoList[index].data[embedcode_index].value);
        }
    },[props.todoList]);
    return (
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>
                {title === "" ? "Website" : title}
            </h3>
            {/* {
                props.type === "Website" || props.type.length === 0
                ? <div style={{
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center",
                    height:"50vh",
                    backgroundColor: "gray"
                }}>
                    <Website />
                </div>
                :   
                <div className="body-text">
                    <p className="app-image">
                        {embedcode === "" ? " ":  embedcode}
                    </p>
                </div>
            } */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps) (Websitepreview)