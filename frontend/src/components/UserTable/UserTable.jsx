import React, { useEffect, useState } from "react";
import { Select, Table, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from "@ant-design/icons";
import {connect} from 'react-redux';
import {getAllUser, updateStatus} from '../../actions/auth';
import './UserTable.scss';

const { confirm } = Modal;

const UserTable = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Success',
      description:
        'You have succesfully changed the status',
    });
  };
  const [data, setData] = useState([]);

  const onSelectChange = (str, email) => {
    showDeleteConfirm(str, email);
  }

  const showDeleteConfirm = (str, email) => {
    confirm({
      title: `Are you sure ${str} this user?`,
      icon: <ExclamationCircleFilled />,
      content: `This user will be ${str}ed`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        props.updateStatus(str, email)
          .then(data => {
            console.log(data);
            if(data === "success"){
              openNotificationWithIcon('success');
            }
          })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columns = [
      {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Status',
        key: 'status',
        render: (_, record) => (
          <Select
            defaultValue={record.status}
            style={{
              width: 120,
            }}
            onChange={(str) => onSelectChange(str, record.email)}
            options={[
              {
                value: 'Active',
                label: 'Active',
              },
              {
                value: 'Pending',
                label: 'Pending',
              },
              {
                value: 'Block',
                label: 'Block',
              },
            ]}
          />
        ),
      },
    ];

    useEffect(() => {
      let tempArr = [];
      props.getAllUser()
        .then(data => {
          data.forEach(
            (item, index) => {
              let tempObj = {
                key: index.toString(),
                name: item.name,
                email: item.email,
                status: item.status
              }
              tempArr = [...tempArr, tempObj];
          })
          setData(tempArr);
        }
        )
    },[])

    return (
      <>
        {contextHolder}
        <Table 
          columns = {columns}  
          dataSource = {data} 
        />
      </>
    )
}



export default connect(null, {getAllUser, updateStatus})(UserTable)