import React, { useState, useEffect } from "react";
import {Button,Form} from 'antd'
import TextArea from "antd/es/input/TextArea";
import { connect } from "react-redux";


const Prayerrequest = (props) => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [checkedvalue, setCheckedValue] = useState([])

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let checkedvalue_index = props.todoList[index].data.findIndex(item => item.dataType === "checkedvalues");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(checkedvalue_index !== -1) setCheckedValue(props.todoList[index].data[checkedvalue_index].value);
        }
    },[props.todoList]);

    return (
        <div className='scroll-bar' 
            style={{
                marginTop:"0", 
                height:"73vh"}} >
            <br />
            <br />
            <br />
            <br />
            <h3 className='app-header'>
                {title === "" ? "Prayer Request" : title}
            </h3>
            <div className="body-text">
                <p> {bodyText === "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}</p>
            </div>
            <Form layout="vertical" style={{width : "80%", margin: "0 auto"}}>
                {
                    checkedvalue.length === 0
                    ?   
                        <>
                        <p style={{textAlign:"left", fontSize:"8px"}}>Name</p>
                        <input type = "text" />
                        <p style={{textAlign:"left", fontSize:"8px"}}>Email</p>
                        <input type = "text" />
                        </>
                    
                    :
                    checkedvalue.map((item, index) => {
                        return(
                            <>
                                <p style={{textAlign:"left", fontSize:"8px"}}>{item}</p>
                                <input type = "text" />
                            </>
                        )
                    })
                }
                <br />
                <Form.Item label = "Prayer Request" style={{marginTop: "10px"}}>
                    <TextArea type="text" />
                </Form.Item>
            </Form>
            <div className="btn-link">   
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default (connect)(mapStateToProps) (Prayerrequest)