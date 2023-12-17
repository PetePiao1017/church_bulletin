import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import CustomUpload from '../CustomUpload/CustomUpload';
import { Table, Select } from "antd";
import './EditDesign.scss';


const EditDesign = (props) => {
    const [data, setData] = useState([]);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        if(props.todoList){
            let tempArr = [];
            props.todoList.forEach((item, index) => {
                let title = "";
                if(item.data.length !== 0) {
                    let index = item.data.findIndex(item => item.dataType === "title");
                    if(index !== -1) title = item.data[index].value;
                }
                else title = item.type;
                let tempObj = {
                    index,
                    id: item.id,
                    list: title,
                    url: item.icon,
                }
                tempArr.push(tempObj);
            })
            setData(tempArr);
        }
    },[props.todoList]);    

    const columns = [
        {
          title: 'Section List',
          dataIndex: 'list',
          key: 'name',
        },
        {
          title: 'Action',  
          key: 'action',
          render: (_, record) => (
            <div style={{margin: "0 auto"}}>
                <CustomUpload
                    value = {"section"}
                    type = "icon"
                    id = {record.id}
                    imageUrl = {record.url}
                >
                </CustomUpload>
            </div>
          ),
        }
    ];

    return(
        <>
            <h1 className="header-edit">Edit Section Styles</h1>
            <div>
                <label style={{margin:"10px"}}>Select Number of Span</label>
                <Select
                    defaultValue="1"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                        value: '1',
                        label: '1',
                        },
                        {
                        value: '2',
                        label: '2',
                        },
                        {
                        value: '3',
                        label: '3',
                        },
                    ]}
                />
            </div>
            <br />
            <br />
            <Table columns={columns} dataSource={data}  style={{width : "70%", margin: "0 auto"}}/>
        </>
        
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps, null)(EditDesign);