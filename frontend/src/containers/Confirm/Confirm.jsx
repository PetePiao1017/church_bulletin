import React, {useState, useEffect, createContext} from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import './Confirm.scss'
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { acceptInvite, rejectInvite } from '../../actions/bulletins';

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);


const Acceptconfig = {
    title: 'Notice',
    content: (
      <>
        <ReachableContext.Consumer>{(name) => `You has accepted invitation!`}</ReachableContext.Consumer>
      </>
    ),
  };

const Rejectconfig = {
    title: 'Notice',
    content: (
      <>
        <ReachableContext.Consumer>{(name) => `You has Rejected invitation!`}</ReachableContext.Consumer>
      </>
    ),
  };

const Confirm = (props) => {
    const [modal, contextHolder] = Modal.useModal();
    const {id} = useParams();
    const appuser_id = id.split('^')[0];
    const user_id = id.split('^')[1];
    return(
        <ReachableContext.Provider value="Light">   
            <div className='register-container'>
                <div className="box">
                    <h2>Confirm</h2>
                    <p>Would you like to be the private member of St.paul Bulletin?</p>
                    <p>{appuser_id}</p>
                    <div className='button-group'>
                        <Button 
                            type = "primary" 
                            className='reject'
                            onClick={() => {
                                modal.info(Rejectconfig);
                                props.rejectInvite(appuser_id, user_id);
                            }}
                        >
                            Reject
                        </Button>
                        <Button 
                            type = "primary" 
                            className='accept'
                            onClick={async () => {
                                modal.info(Acceptconfig);
                                props.acceptInvite(appuser_id, user_id);
                            }}
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
            {contextHolder}
            <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors
})

export default connect(mapStateToProps, {acceptInvite, rejectInvite} )(Confirm)